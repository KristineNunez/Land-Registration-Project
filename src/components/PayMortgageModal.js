import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { payMortgage } from '../utils/operations';
import Spinner from './Spinner';

const PayMortgageModal = React.forwardRef(({ closeModal }, ref) => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    await payMortgage(data.reg_num, data.amount);
    setLoading(false);

    closeModal();
  };

  return (
    <Dialog ref={ref} as="div" className="relative z-10" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-x-hidden overflow-y-auto">
        <div className="flex justify-end min-h-full text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="translate-x-10"
            enterTo="translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="flex flex-col w-full max-w-md gap-4 p-6 overflow-hidden text-left text-white transition-all transform border-l shadow-xl border-white/10 bg-content">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                Land Registration
              </Dialog.Title>
              <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                <p>
                  {'Registration Number: '}
                  <input
                    {...register('registrationNumber')}
                    placeholder="Registration Number"
                    type="number"
                    name="reg_num"
                    required
                    className="text-content"
                  />
                </p>
                <p>
                  {'Amount to Pay: '}
                  <input
                    {...register('amountToPay')}
                    placeholder="Amount to Pay (Tezos)"
                    type="number"
                    name="amount"
                    required
                    className="text-content"
                  />
                </p>
                <p>{data}</p>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white border border-transparent bg-dark hover:bg-dark/80"
                  onClick={handleSubmit((data) => onSubmit(data))}
                >
                  {loading ? <Spinner /> : 'Pay Mortgage'}
                </button>
              </form>
              {data ?? 'a'}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  );
});

export default PayMortgageModal;
