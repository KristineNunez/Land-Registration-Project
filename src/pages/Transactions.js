import { PlusSmallIcon } from '@heroicons/react/24/outline';
//import Card from '../components/Card';
import { Transition } from '@headlessui/react';

import RemovePropertyModal from '../components/RemovePropertyModal';
import PayLeaseModal from '../components/PayLeaseModal';
import PayMortgageModal from '../components/PayMortgageModal';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { getTokens } from '../utils/storage';
import getImageURL from '../utils/image';

export default function Transactions() {
  const [removePropertyModalOpen, setRemovePropertyModalOpen] = useState(false);
  const [payLeaseModalOpen, setPayLeaseModalOpen] = useState(false);
  const [payMortgageModalOpen, setPayMortgageModalOpen] = useState(false);
  //const [tokens, setTokens] = useState([]);

  const closeRemovePropertyModal = () => {
    setRemovePropertyModalOpen(false);
  };

  const openRemovePropertyModal = () => {
    setRemovePropertyModalOpen(true);
  };

  const closePayLeaseModal = () => {
    setPayLeaseModalOpen(false);
  };

  const openPayLeaseModal = () => {
    setPayLeaseModalOpen(true);
  };

  const closePayMortgageModal = () => {
    setPayMortgageModalOpen(false);
  };

  const openPayMortgageModal = () => {
    setPayMortgageModalOpen(true);
  };

  /*const fetchTokens = useCallback(async () => {
    const tokens = await getTokens();
    setTokens(tokens);
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);*/

  return (
    <>
      <h1 className="sticky top-0 py-6 border-b bg-inherit border-white/10">
        Transactions
      </h1>
        {/*Remove property = Burn title*/}
        <div>
          <button
            onClick={openRemovePropertyModal}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-content hover:bg-[#1c1b1c/80]"
          >
            <PlusSmallIcon className="inline w-4 h-4 mr-1" />
            Remove Property
          </button>
          <Transition appear show={removePropertyModalOpen} as={Fragment}>
            <RemovePropertyModal closeModal={closeRemovePropertyModal} />
          </Transition>
        </div>

        {/*Pay lease*/}
        <div>
          <button
            onClick={openPayLeaseModal}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-content hover:bg-[#1c1b1c/80]"
          >
            <PlusSmallIcon className="inline w-4 h-4 mr-1" />
            Pay Lease
          </button>
          <Transition appear show={payLeaseModalOpen} as={Fragment}>
            <PayLeaseModal closeModal={closePayLeaseModal} />
          </Transition>
        </div>

        {/*Pay mortgage*/}
        <div>
          <button
            onClick={openPayMortgageModal}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-content hover:bg-[#1c1b1c/80]"
          >
            <PlusSmallIcon className="inline w-4 h-4 mr-1" />
            Pay Mortgage
          </button>
          <Transition appear show={payMortgageModalOpen} as={Fragment}>
            <PayMortgageModal closeModal={closePayMortgageModal} />
          </Transition>
        </div>
    </>
  );
}
