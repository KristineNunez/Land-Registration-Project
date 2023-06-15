import { PlusSmallIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import { Transition } from '@headlessui/react';

import AddPropertyModal from '../components/AddPropertyModal';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { getTokens, getEncumbrance } from '../utils/storage';
import getImageURL from '../utils/image';

export default function Gallery() {
  const [addPropertyModalOpen, setAddPropetyModalOpen] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [encumbrances, setEncumbrance] = useState([]);

  const closeModal = () => {
    setAddPropetyModalOpen(false);
  };

  const openModal = () => {
    setAddPropetyModalOpen(true);
  };

  const fetchTokens = useCallback(async () => {
    const tokens = await getTokens();
    setTokens(tokens);
  }, []);

  const fetchEncumbrance = useCallback(async () => {
    const encumbrances = await getEncumbrance();
    setEncumbrance(encumbrances);
  }, []);

  useEffect(() => {
    fetchTokens();
    fetchEncumbrance();
  }, [fetchTokens, fetchEncumbrance]);

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
        {tokens.map((token)=> (

          <Card
            key={token.token_id}
            token_id={token.token_id}
            location={token.token_info.location}
            image={getImageURL(token.token_info.image)}
            tax_value={token.token_info.tax_value}
            encumbrance = {encumbrances[token.token_id].value.type}
            payment = {encumbrances[token.token_id].value.amount}
          />
        ))}
      </div>
    </>
  );
}
