import { toast } from 'react-toastify';
import { tezos } from './tezos.js';
import { contractAddress } from './wallet.js';
import { v4 as uuidv4 } from 'uuid';

const gasBuffer = 500;
const MINIMAL_FEE_PER_GAS_MUTEZ = 0.1;
const increasedFee = (gasBuffer, opSize) => {
  return gasBuffer * MINIMAL_FEE_PER_GAS_MUTEZ + opSize;
};

export const getAccountBalance = async (address) => {
  const account = await tezos.tz.getBalance(address);
  return account.toNumber() / 1000000;
};

export const registerLand = async (metadata) => {
  console.log(metadata);

  const contract = await tezos.wallet.at(contractAddress);
  const opEntry = contract.methodsObject
    .register_land(metadata)
    .toTransferParams({});
  const estimate = await tezos.estimate.transfer(opEntry);

  const op = await contract.methodsObject.register_land(metadata).send({
    fee:
      estimate.suggestedFeeMutez +
      increasedFee(gasBuffer, Number(estimate.opSize)),
    gasLimit: estimate.gasLimit + gasBuffer,
    storageLimit: estimate.storageLimit,
  });

  await new Promise((resolve, reject) => {
    const evts = [];

    op.confirmationObservable(1).subscribe(
      (event) => {
        const entry = {
          level: event.block.header.level,
          currentConfirmation: event.currentConfirmation,
        };
        evts.push(entry);
      },
      () => reject(null),
      () => {
        toast.success('Transaction posted');
        resolve(evts);
      }
    );
  });
};

export const burnTitle= async (reg_num) => {
  console.log(reg_num);

  const contract = await tezos.wallet.at(contractAddress);
  const opEntry = contract.methodsObject
    .burn_title(reg_num)
    .toTransferParams({});
  const estimate = await tezos.estimate.transfer(opEntry);

  const op = await contract.methodsObject.burn_title(reg_num).send({
    fee:
      estimate.suggestedFeeMutez +
      increasedFee(gasBuffer, Number(estimate.opSize)),
    gasLimit: estimate.gasLimit + gasBuffer,
    storageLimit: estimate.storageLimit,
  });

  await new Promise((resolve, reject) => {
    const evts = [];

    op.confirmationObservable(1).subscribe(
      (event) => {
        const entry = {
          level: event.block.header.level,
          currentConfirmation: event.currentConfirmation,
        };
        evts.push(entry);
      },
      () => reject(null),
      () => {
        toast.success('Transaction posted');
        resolve(evts);
      }
    );
  });
};

export const sellLand= async (data) => {
  //Data contains reg_num and price
  console.log(data);

  const contract = await tezos.wallet.at(contractAddress);
  const opEntry = contract.methodsObject
    .sell_land(data)
    .toTransferParams({});
  const estimate = await tezos.estimate.transfer(opEntry);

  const op = await contract.methodsObject.sell_land(data).send({
    fee:
      estimate.suggestedFeeMutez +
      increasedFee(gasBuffer, Number(estimate.opSize)),
    gasLimit: estimate.gasLimit + gasBuffer,
    storageLimit: estimate.storageLimit,
  });

  await new Promise((resolve, reject) => {
    const evts = [];

    op.confirmationObservable(1).subscribe(
      (event) => {
        const entry = {
          level: event.block.header.level,
          currentConfirmation: event.currentConfirmation,
        };
        evts.push(entry);
      },
      () => reject(null),
      () => {
        toast.success('Transaction posted');
        resolve(evts);
      }
    );
  });
};

export const buyLand= async (reg_num, amount) => {
  console.log(reg_num, amount);

  const contract = await tezos.wallet.at(contractAddress);
  const opEntry = contract.methodsObject
    .buy_land(reg_num, amount)
    .toTransferParams({});
  const estimate = await tezos.estimate.transfer(opEntry);
  const storage = await contract.storage();

  const op = await contract.methodsObject.buy_land(reg_num).send({
    fee:
      estimate.suggestedFeeMutez +
      increasedFee(gasBuffer, Number(estimate.opSize)),
    gasLimit: estimate.gasLimit + gasBuffer,
    storageLimit: estimate.storageLimit,
    source: storage.ledger[reg_num],
    amount: amount,
    mutez: false
  });

  await new Promise((resolve, reject) => {
    const evts = [];

    op.confirmationObservable(1).subscribe(
      (event) => {
        const entry = {
          level: event.block.header.level,
          currentConfirmation: event.currentConfirmation,
        };
        evts.push(entry);
      },
      () => reject(null),
      () => {
        toast.success('Transaction posted');
        resolve(evts);
      }
    );
  });
};

export const addEncumbrance= async (data) => {
  //Data contains reg_num, type, date, amount, months
  console.log(data);

  const contract = await tezos.wallet.at(contractAddress);
  const opEntry = contract.methodsObject
    .add_encumbrance(data)
    .toTransferParams({});
  const estimate = await tezos.estimate.transfer(opEntry);

  const op = await contract.methodsObject.add_encumbrance(data).send({
    fee:
      estimate.suggestedFeeMutez +
      increasedFee(gasBuffer, Number(estimate.opSize)),
    gasLimit: estimate.gasLimit + gasBuffer,
    storageLimit: estimate.storageLimit
  });

  await new Promise((resolve, reject) => {
    const evts = [];

    op.confirmationObservable(1).subscribe(
      (event) => {
        const entry = {
          level: event.block.header.level,
          currentConfirmation: event.currentConfirmation,
        };
        evts.push(entry);
      },
      () => reject(null),
      () => {
        toast.success('Transaction posted');
        resolve(evts);
      }
    );
  });
};

export const payLease= async (reg_num, amount) => {
  console.log(reg_num);

  const contract = await tezos.wallet.at(contractAddress);
  const opEntry = contract.methodsObject
    .pay_lease(reg_num)
    .toTransferParams({});
  const estimate = await tezos.estimate.transfer(opEntry);
  const storage = await contract.storage();

  const op = await contract.methodsObject.pay_lease(reg_num).send({
    fee:
      estimate.suggestedFeeMutez +
      increasedFee(gasBuffer, Number(estimate.opSize)),
    gasLimit: estimate.gasLimit + gasBuffer,
    storageLimit: estimate.storageLimit,
    amount: amount,
    source: storage.ledger[reg_num]
  });

  await new Promise((resolve, reject) => {
    const evts = [];

    op.confirmationObservable(1).subscribe(
      (event) => {
        const entry = {
          level: event.block.header.level,
          currentConfirmation: event.currentConfirmation,
        };
        evts.push(entry);
      },
      () => reject(null),
      () => {
        toast.success('Transaction posted');
        resolve(evts);
      }
    );
  });
};

export const payMortgage= async (reg_num, amount) => {
  console.log(reg_num);

  const contract = await tezos.wallet.at(contractAddress);
  const opEntry = contract.methodsObject
    .pay_mortgage(reg_num)
    .toTransferParams({});
  const estimate = await tezos.estimate.transfer(opEntry);
  const storage = await contract.storage();

  const op = await contract.methodsObject.pay_mortgage(reg_num).send({
    fee:
      estimate.suggestedFeeMutez +
      increasedFee(gasBuffer, Number(estimate.opSize)),
    gasLimit: estimate.gasLimit + gasBuffer,
    storageLimit: estimate.storageLimit,
    amount: amount,
    source: storage.ledger[reg_num]
  });

  await new Promise((resolve, reject) => {
    const evts = [];

    op.confirmationObservable(1).subscribe(
      (event) => {
        const entry = {
          level: event.block.header.level,
          currentConfirmation: event.currentConfirmation,
        };
        evts.push(entry);
      },
      () => reject(null),
      () => {
        toast.success('Transaction posted');
        resolve(evts);
      }
    );
  });
};


