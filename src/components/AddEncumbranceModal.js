import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { addEncumbrance } from '../utils/operations';
import Spinner from './Spinner';

const AddEncumbranceModal = React.forwardRef(({ closeModal }, ref) => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  var d = new Date();
  var datestring = d.getFullYear()  + "-" + ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0"+(d.getDate())).slice(-2) + "T" + ("0"+(d.getHours())).slice(-2) + ":" + ("0"+(d.getMinutes())).slice(-2) + ":"+ ("0"+(d.getSeconds())).slice(-2) + "Z";

  const onSubmit = async (data) => {
    setLoading(true);

    const encumbrances = {
      amount : data.amount,
      months : data.months,
      reg_num : data.reg_num, 
      date : datestring,
      type : data.type,
    };

    await addEncumbrance(encumbrances);
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
                Apply for Lease/Mortgage
              </Dialog.Title>

              <form
                onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
              >
                <div>
                  <label htmlFor="reg_num" className="block text-sm font-medium">
                    Registration Number:
                  </label>
                  <input
                    {...register('reg_num')}
                    placeholder="Registration Number"
                    type="number"
                    name="reg_num"
                    required
                    className="text-content"
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium"
                  >
                    Type (Lease/Mortgage):
                  </label>
                  <input
                    {...register('type')}
                    placeholder="Type"
                    type="text"
                    name="type"
                    className="text-content"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="months" className="block text-sm font-medium">
                    Number of Months:
                  </label>
                  <input
                    {...register('months')}
                    placeholder="Month/s"
                    type="number"
                    name="months"
                    required
                    className="text-content"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium">
                    Amount:
                  </label>
                  <input
                    {...register('amount')}
                    placeholder="Amount (in tezos)"
                    type="text"
                    name="amount"
                    required
                    className="text-content"
                  />
                </div>


                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white border border-transparent bg-dark hover:bg-dark/80"
                  onClick={handleSubmit((data) => onSubmit(data))}
                >
                  {loading ? <Spinner /> : 'Transact'}
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

export default AddEncumbranceModal;
