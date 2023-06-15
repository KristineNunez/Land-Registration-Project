import { Transition } from '@headlessui/react';
import { PlusSmallIcon, TagIcon } from '@heroicons/react/24/outline';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { getUserProperties, getUserSellingProperties } from '../utils/storage';
import { getAccountAddress } from '../utils/wallet';
import getImageURL from '../utils/image';

import AddPropertyModal from '../components/AddPropertyModal';
import SellPropertyModal from '../components/SellPropertyModal';
import Card from '../components/Card';

export default function Profile() {
  const [addPropertModalOpen, setAddPropertyModalOpen] = useState(false);
  const [sellPropertyModalOpen, setSellPropertyModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [sellingProperites, setSellingProperties] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);

  const fetchUserProperties = useCallback(async () => {
    const accountAddress = await getAccountAddress();

    const properties = await getUserProperties(accountAddress);
    setProperties(properties);
  }, []);

  const fetchUserSellingProperties = useCallback(async () => {
    const accountAddress = await getAccountAddress();

    const properties = await getUserSellingProperties(accountAddress);

    setSellingProperties(properties);
  }, []);

  useEffect(() => {
    fetchUserProperties();
    fetchUserSellingProperties();
  }, [fetchUserProperties, fetchUserSellingProperties]);

  return (
    <>
      <div className="sticky top-0 flex items-center justify-between pt-6 pb-4 border-b bg-inherit border-white/10">
        <h1 className="text-lg">Profile</h1>
        <div className="flex gap-4">
          {selectedToken && (
            <button
              onClick={() => setSellPropertyModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-primary hover:bg-[#1c1b1c/80]"
            >
              <TagIcon className="inline w-4 h-4 mr-1" />
              Sell Property
            </button>
          )}
          <button
            onClick={() => setAddPropertyModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-content hover:bg-[#1c1b1c/80]"
          >
            <PlusSmallIcon className="inline w-4 h-4 mr-1" />
            Add Property
          </button>
          <Transition appear show={addPropertModalOpen} as={Fragment}>
            <AddPropertyModal
              closeModal={() => setAddPropertyModalOpen(false)}
            />
          </Transition>
          <Transition appear show={sellPropertyModalOpen} as={Fragment}>
            <SellPropertyModal
              closeModal={() => setSellPropertyModalOpen(false)}
              token={selectedToken}
            />
          </Transition>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 @6xl:grid-cols-5 @5xl:grid-cols-4 @3xl:grid-cols-3 @2xl:grid-cols-3 @lg:grid-cols-2">
        {properties?.map((token) => (
          <Card
            key={token.id}
            token_id={token.id}
            location={token.location}
            image={getImageURL(token.image)}
            tax_value={token.tax_value}
            size={token.size}
            onClick={() => setSelectedToken(token)}
            className={`cursor-pointer ${
              selectedToken?.id === token.id
                ? 'ring-2 ring-white ring-offset-1 ring-offset-dark'
                : ''
            }`}
          />
        ))}
      </div>
      <div className="sticky top-0 flex items-center justify-between pt-6 pb-4 border-b bg-inherit border-white/10">
        <h1 className="text-lg">For Sale</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 @6xl:grid-cols-5 @5xl:grid-cols-4 @3xl:grid-cols-3 @2xl:grid-cols-3 @lg:grid-cols-2">
        {sellingProperites?.map((token) => (
          <Card
            key={token.id}
            token_id={token.id}
            location={token.location}
            image={getImageURL(token.image)}
            tax_value={token.tax_value}
            size={token.size}
            price={token.price}
            className={`cursor-pointer ${
              selectedToken?.id === token.id
                ? 'ring-2 ring-white ring-offset-1 ring-offset-dark'
                : ''
            }`}
          />
        ))}
      </div>
    </>
  );
}
