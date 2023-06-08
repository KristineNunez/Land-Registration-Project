import smartpy as sp

FA2 = sp.io.import_template("fa2_lib.py")

class LandRegNFT(FA2.Admin, FA2.Fa2Nft, FA2.BurnNft):
    def __init__(self, admin, metadata, token_metadata = {}, ledger = {}, policy = None, metadata_base = None):
        FA2.Fa2Nft.__init__(self, metadata, token_metadata = token_metadata, ledger = ledger, policy = policy, metadata_base = metadata_base)
        FA2.Admin.__init__(self, admin)
        FA2.BurnNft.__init__(self)
        self.update_initial_storage(sell_value = {},
                                    encumbrance = {})

    def make_metadata(self, size, location, tax_value, image):
        "Build metadata JSON bytes values. (registration number -> token_id)"
        return (sp.map(l = {
            "size" : sp.utils.bytes_of_string("%d" % size),
            "tax_value" : sp.utils.bytes_of_string("%d" % tax_value),
            "location" : sp.utils.bytes_of_string(location),
            "image" : sp.utils.bytes_of_string(image),
        }))

    #Minting land to blockchain
    @sp.entry_point  
    def register_land(self, token_info):
        token_id= self.data.last_token_id
        self.data.ledger[token_id] = sp.sender #owner of the land
        self.data.token_metadata[token_id] = sp.record(token_id = token_id, token_info = token_info)
        self.data.encumbrance[token_id] = sp.record(type="", date=sp.timestamp(0), amount=sp.tez(0), liability = sp.address("tz1"), months = sp.int(0))
        self.data.last_token_id += 1

    @sp.entry_point
    #Add encumbrance (i.e. note lease, mortgage)
    def add_encumbrance(self, reg_num, type, date, amount, liability, months):
        #One encumbrance at a time
        sp.verify(self.data.encumbrance[reg_num].type == "", "LAND ALREADY HAS ENCUMBRANCE")

        self.data.encumbrance[reg_num].type   = type
        self.data.encumbrance[reg_num].date   = date
        self.data.encumbrance[reg_num].amount = amount
        self.data.encumbrance[reg_num].liability = sp.source
        self.data.encumbrance[reg_num].months = months

    #Remove encumbrance 
    def remove_encumbrance(self, reg_num):
        #Ensure encumbrance exists
        sp.verify(self.data.encumbrance[reg_num].type != "", "LAND HAS NO EXISTING ENCUMBRANCE")

        self.data.encumbrance[reg_num].type   = ""
        self.data.encumbrance[reg_num].date   = sp.timestamp(0)
        self.data.encumbrance[reg_num].amount = sp.tez(0)
        self.data.encumbrance[reg_num].liability = sp.address("tz1")
        self.data.encumbrance[reg_num].months = sp.int(0)
    
    #Transfer land title to buyer/heir   
    def transfer_title(self, reg_num, params):
        #Title can only be transferred if there are no encumbrances
        sp.verify(self.data.encumbrance[reg_num].type == "", "CANNOT TRANSFER TITLE IF LAND HAS ENCUMBRANCES")

        #Default transfer entrypoint 
        sp.set_type(params, sp.TList(sp.TRecord(from_ = sp.TAddress, txs = sp.TList(sp.TRecord(amount = sp.TNat, to_ = sp.TAddress, token_id = sp.TNat).layout(("to_", ("token_id", "amount"))))).layout(("from_", "txs"))))
        sp.for transfer in params:
            sp.for tx in transfer.txs:
                sp.verify(self.data.token_metadata.contains(tx.token_id), 'FA2_TOKEN_UNDEFINED')
                sp.verify((sp.sender == transfer.from_) | (self.data.operators.contains(sp.record(operator = sp.sender, owner = transfer.from_, token_id = tx.token_id))), 'FA2_NOT_OPERATOR')
                sp.if tx.amount > 0:
                    sp.verify((tx.amount == 1) & (self.data.ledger[tx.token_id] == transfer.from_), 'FA2_INSUFFICIENT_BALANCE')
                    self.data.ledger[tx.token_id] = tx.to_

    #Default burn entrypoint can be used
        
    #Selling land to display
    @sp.entry_point  
    def sell_land(self, reg_num, price):
        sp.set_type(price, sp.TMutez)
        
        #Ensure that land is registered
        sp.verify(self.data.token_metadata.contains(reg_num), "LAND IS NOT REGISTERED")

        #Put price in a map
        self.data.sell_value[reg_num] = price
            
    #Buying land
    @sp.entry_point
    def buy_land(self, reg_num):
        #sp.sender - seller, sp.source - buyer
        price = self.data.sell_value[reg_num]
        
        #Ensure that land is registered
        sp.verify(self.data.token_metadata.contains(reg_num), "LAND IS NOT REGISTERED")

        #Ensure that land is up for sale
        sp.verify(self.data.sell_value.contains(reg_num), "LAND IS NOT UP FOR SALE")

        #Ensure that buyer is not seller
        sp.verify(self.data.ledger[reg_num]!=sp.source, "BUYER IS CURRENT OWNER OF LAND")

        #Ensure that payment is equal or greater than the price
        sp.verify(sp.amount>=price, "NOT ENOUGH PAYMENT")

        #Send money to seller
        sp.send(sp.sender, price) 
        
        #Return money to buyer if extra
        extra_amount = sp.amount - price
        sp.if extra_amount > sp.tez(0):
            sp.send(sp.sender, extra_amount)

        #Transfer title to buyer
        self.transfer_title(reg_num, [sp.record(from_ = sp.sender, txs = [sp.record(to_= sp.source, amount= sp.nat(1), token_id=reg_num)])])
    
        #Delete selling value
        del self.data.sell_value[reg_num]

    #Pay lease
    @sp.entry_point
    def pay_lease(self, reg_num):
        #sp.sender -> leessee
        
        #Check if lessee
        sp.verify(sp.sender == self.data.encumbrance[reg_num].liability, "NOT THE LESSEE")
        
        #Check if amount is greater than or equal to pay
        sp.verify(sp.amount >= self.data.encumbrance[reg_num].amount, "NOT ENOUGH FOR PAYMENT")
        
        #Send money to owner
        sp.send(self.data.ledger[reg_num], self.data.encumbrance[reg_num].amount)
        
        #Return money if extra
        extra_amount = sp.amount - self.data.encumbrance[reg_num].amount
        sp.if extra_amount > sp.tez(0):
            sp.send(sp.sender, extra_amount)

        #Minus months of lease
        self.data.encumbrance[reg_num].months = self.data.encumbrance[reg_num].months-1

        #If lease period is done, remove encumbrance
        sp.if self.data.encumbrance[reg_num].months == 0:
            self.remove_encumbrance(reg_num)

    #Pay mortgage
    @sp.entry_point
    def pay_mortgage(self, reg_num):
        #sp.source -> loan person, sp.sender -> owner
        
        #Check if loan person
        sp.verify(sp.source == self.data.encumbrance[reg_num].liability, "NOT THE LOAN PERSON")
        
        #Check if amount is greater than or equal to pay
        sp.verify(sp.amount >= self.data.encumbrance[reg_num].amount, "NOT ENOUGH FOR PAYMENT")
        
        #Send money to owner
        sp.send(self.data.ledger[reg_num], self.data.encumbrance[reg_num].amount)
        
        #Return money if extra
        extra_amount = sp.amount - self.data.encumbrance[reg_num].amount
        sp.if extra_amount > sp.tez(0):
            sp.send(sp.source, extra_amount)

        #Minus months of mortgage
        self.data.encumbrance[reg_num].months = self.data.encumbrance[reg_num].months-1

        #If mortgage months is equal to 0, remove encumbrance and transfer title
        sp.if self.data.encumbrance[reg_num].months == 0:
            self.remove_encumbrance(reg_num)
            self.transfer_title(reg_num, [sp.record(from_ = sp.sender, txs = [sp.record(to_= sp.source, amount= sp.nat(1), token_id=reg_num)])])
            

@sp.add_test(name = "landreg")
def test():
    scenario = sp.test_scenario()
    scenario.h1("Land Registration")

    admin = sp.test_account("Admin")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    carol = sp.test_account("Carol")

    nft = LandRegNFT(
        admin = admin.address,
        metadata = sp.utils.metadata_of_url("http://example.com")
    )

    scenario+=nft
    metadata1 = nft.make_metadata(
            size = 20, 
            location = "Quezon City",
            tax_value = 3, 
            image = "ipfs://QmRbmXcd2yfNVdgHL7oYWS2yd3tztr2NZiqP2LFuw3voPW") #need to upload image on IPFS

    metadata2 = nft.make_metadata(
            size = 15, 
            location = "Pasay City",
            tax_value = 2, 
            image = "ipfs://QmRbmXcd2yfNVdgHL7oYWS2yd3tztr2NZiqP2LFuw3voPW") #need to upload image on IPFS

    #Assume that amount for lease and mortgage are already computed beforehand
    
    nft.register_land(metadata1).run(sender=alice)
    nft.register_land(metadata2).run(sender=bob)
    
    nft.sell_land(reg_num = 1, price = sp.tez(10)).run(sender=bob)
    nft.sell_land(reg_num = 0, price = sp.tez(20)).run(sender=alice)
    
    nft.buy_land(0).run(sender = alice, amount = sp.tez(30), source = bob)
    
    nft.add_encumbrance(reg_num= 1, type = "lease", date= sp.now, amount= sp.tez(5), months = sp.int(1)).run(sender=bob, source=carol)
    nft.pay_lease(1).run(sender=carol, amount= sp.tez(5))
    
    nft.add_encumbrance(reg_num= 0, type = "mortgage", date= sp.now, amount= sp.tez(6), months = sp.int(1)).run(sender=bob, source=carol)
    nft.pay_mortgage(0).run(source = carol, sender = bob, amount= sp.tez(6))

@sp.add_test(name = "landreg2")
def test2():
    scenario = sp.test_scenario()
    scenario.h1("Land Registration 2")

    admin = sp.test_account("Admin")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    carol = sp.test_account("Carol")

    nft = LandRegNFT(
        admin = admin.address,
        metadata = sp.utils.metadata_of_url("http://example.com")
    )

    scenario+=nft
    metadata1 = nft.make_metadata(
            size = 20, 
            location = "Quezon City",
            tax_value = 3, 
            image = "ipfs://QmRbmXcd2yfNVdgHL7oYWS2yd3tztr2NZiqP2LFuw3voPW") #need to upload image on IPFS

    metadata2 = nft.make_metadata(
            size = 15, 
            location = "Pasay City",
            tax_value = 2, 
            image = "ipfs://QmRbmXcd2yfNVdgHL7oYWS2yd3tztr2NZiqP2LFuw3voPW") #need to upload image on IPFS

    #Assume that amount for lease and mortgage are already computed beforehand
    
    nft.register_land(metadata1).run(sender=alice)
    nft.register_land(metadata2).run(sender=bob)

    #Burn tests
    nft.burn([
        sp.record(
            amount=1,
            from_ = alice.address,
            token_id=sp.nat(0)
        )
    ]).run(sender=alice)

    nft.burn([
        sp.record(
            amount=1,
            from_ = bob.address,
            token_id=sp.nat(1)
        )
    ]).run(sender=bob)
