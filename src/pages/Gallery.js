import {
  CurrencyBangladeshiIcon,
  PlusSmallIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import { Transition } from '@headlessui/react';

import AddPropertyModal from '../components/AddPropertyModal';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { getSellingProperties, getTokens } from '../utils/storage';
import getImageURL from '../utils/image';
import { buyLand } from '../utils/operations';

export default function Gallery() {
  const [addPropertyModalOpen, setAddPropetyModalOpen] = useState(false);
  const [sellingProperites, setSellingProperties] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);

  const closeModal = () => {
    setAddPropetyModalOpen(false);
  };

  const openModal = () => {
    setAddPropetyModalOpen(true);
  };

  const buyProperty = async () => {
    try {
      await buyLand(selectedToken);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProperties = useCallback(async () => {
    const tokens = await getTokens();
    setTokens(tokens);
  }, []);

  const fetchSellingProperties = useCallback(async () => {
    const properties = await getSellingProperties();

    setSellingProperties(properties);
  }, []);

  useEffect(() => {
    fetchProperties();
    fetchSellingProperties();
  }, [fetchProperties, fetchSellingProperties]);

  return (
    <>
      <div className="sticky top-0 flex items-center justify-between pt-6 pb-4 border-b bg-inherit border-white/10">
        <h1 className="text-lg">Gallery</h1>
        <div>
          <button
            onClick={openModal}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-content hover:bg-[#1c1b1c/80]"
          >
            <PlusSmallIcon className="inline w-4 h-4 mr-1" />
            Add Property
          </button>
          <Transition appear show={addPropertyModalOpen} as={Fragment}>
            <AddPropertyModal closeModal={closeModal} />
          </Transition>
        </div>
      </div>
      <div className="pb-6 grid grid-cols-1 gap-4 @6xl:grid-cols-5 @5xl:grid-cols-4 @3xl:grid-cols-3 @2xl:grid-cols-3 @lg:grid-cols-2">
        {tokens.map((token) => (
          <Card
            key={token.token_id}
            token_id={token.token_id}
            location={token.token_info.location}
            image={getImageURL(token.token_info.image)}
            tax_value={token.token_info.tax_value}
          />
        ))}
      </div>
      <div className="sticky top-0 flex items-center justify-between pt-6 pb-4 border-b bg-inherit border-white/10">
        <h1 className="text-lg">For Sale</h1>
        <div className="flex gap-4">
          {selectedToken && (
            <button
              onClick={buyProperty}
              className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-primary hover:bg-[#1c1b1c/80]"
            >
              <CurrencyBangladeshiIcon className="inline w-4 h-4 mr-1" />
              Buy Property
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 @6xl:grid-cols-5 @5xl:grid-cols-4 @3xl:grid-cols-3 @2xl:grid-cols-3 @lg:grid-cols-2">
        {sellingProperites?.map((token) => (
          <Card
            key={token.id}
            token_id={token.id}
            location={token.location}
            image={getImageURL(token.image)}
            onClick={() => setSelectedToken(token)}
            tax_value={token.tax_value}
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
