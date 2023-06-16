import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { sellLand } from '../utils/operations';
import Spinner from './Spinner';

const SellPropertyModal = React.forwardRef(({ closeModal, token }, ref) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      reg_num: token.id,
      price: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await sellLand(data);
    } catch (e) {
      alert(e);
    }

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
                Sell Property
              </Dialog.Title>

              <form>
                <div>
                  <label htmlFor="regNum" className="block text-sm font-medium">
                    Registration Number:
                  </label>
                  <input
                    {...register('reg_num')}
                    defaultValue={token.token_id}
                    placeholder="Registration Number"
                    disabled
                    type="number"
                    name="price"
                    className="text-content"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price:
                  </label>
                  <input
                    {...register('price')}
                    placeholder="Price (Tezos)"
                    type="number"
                    name="price"
                    className="text-content"
                    required
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white border border-transparent bg-primary hover:bg-primary/80"
                  onClick={handleSubmit((data) => onSubmit(data))}
                >
                  {loading ? <Spinner /> : 'Submit'}
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  );
});

export default SellPropertyModal;
