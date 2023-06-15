import { PlusSmallIcon } from '@heroicons/react/24/outline';
//import Card from '../components/Card';
import { Transition } from '@headlessui/react';

import RemovePropertyModal from '../components/RemovePropertyModal';
import AddEncumbranceModal from '../components/AddEncumbranceModal';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { getTokens } from '../utils/storage';
import getImageURL from '../utils/image';

export default function Transactions() {
  const [removePropertyModalOpen, setRemovePropertyModalOpen] = useState(false);
  const [addEncumbranceModalOpen, setAddEncumbranceModalOpen] = useState(false);
  const [tokens, setTokens] = useState([]);

  const closeModal = () => {
    setRemovePropertyModalOpen(false);
  };

  const openModal = () => {
    setRemovePropertyModalOpen(true);
  };

  const closeModal1 = () => {
    setAddEncumbranceModalOpen(false);
  };

  const openModal1 = () => {
    setAddEncumbranceModalOpen(true);
  };

  const fetchTokens = useCallback(async () => {
    const tokens = await getTokens();
    setTokens(tokens);
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return (
    <>
      <h1 className="sticky top-0 py-6 border-b bg-inherit border-white/10">
        Transactions
      </h1>
        {/*Remove property = Burn title*/}
        <div>
          <button
            onClick={openModal}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-content hover:bg-[#1c1b1c/80]"
          >
            <PlusSmallIcon className="inline w-4 h-4 mr-1" />
            Remove Property
          </button>
          <Transition appear show={removePropertyModalOpen} as={Fragment}>
            <RemovePropertyModal closeModal={closeModal} />
          </Transition>
        </div>

        {/*Add Encumbrance = Apply for Lease and Mortgage*/}
        <div>
          <button
            onClick={openModal1}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-content hover:bg-[#1c1b1c/80]"
          >
            <PlusSmallIcon className="inline w-4 h-4 mr-1" />
            Apply for Lease/Mortgage
          </button>
          <Transition appear show={addEncumbranceModalOpen} as={Fragment}>
            <AddEncumbranceModal closeModal={closeModal1} />
          </Transition>
        </div>
    </>
  );
}
