import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import mint from '../utils/mint';
import { registerLand } from '../utils/operations';
import Spinner from './Spinner';

const AddPropertyModal = React.forwardRef(({ closeModal }, ref) => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const ipfsHash = await mint(data.image);

    const metadata = {
      size: data.size,
      loc: data.location,
      tax_value: data.taxValue,
      image: `ipfs://${ipfsHash}`,
    };

    await registerLand(metadata);
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

              <form
                onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
              >
                <div>
                  <label htmlFor="size" className="block text-sm font-medium">
                    Land Size:
                  </label>
                  <input
                    {...register('size')}
                    placeholder="Size of Land (sq. m)"
                    type="number"
                    name="size"
                    required
                    className="text-content"
                  />
                </div>

                <div>
                  <label
                    htmlFor="taxValue"
                    className="block text-sm font-medium"
                  >
                    Tax Value:
                  </label>
                  <input
                    {...register('taxValue')}
                    placeholder="Tax Value (Tezos)"
                    type="number"
                    name="taxValue"
                    className="text-content"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium"
                  >
                    Location:
                  </label>
                  <input
                    {...register('location')}
                    placeholder="Location"
                    type="text"
                    name="location"
                    className="text-content"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium">
                    Image:
                  </label>
                  <input
                    {...register('image')}
                    placeholder="image"
                    name="image"
                    type="file"
                    className="text-white bg-dark"
                    required
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white border border-transparent bg-dark hover:bg-dark/80"
                  onClick={handleSubmit((data) => onSubmit(data))}
                >
                  {loading ? <Spinner /> : 'Register'}
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

export default AddPropertyModal;
