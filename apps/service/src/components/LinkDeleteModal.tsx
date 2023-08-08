'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { useLinkDeleteModalActions, useLinkDeleteModalIsOpen } from '~/hooks/useLinkDeleteModalStore';

const LinkDeleteModal = () => {
  const router = useRouter();
  const isOpen = useLinkDeleteModalIsOpen();
  const { closeModal, deleteLink } = useLinkDeleteModalActions();

  const handleDelete = async () => {
    await deleteLink();
    closeModal();
    router.refresh();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  삭제하시겠습니까?
                </Dialog.Title>

                <div className="mt-2">
                  <p className="pt-2 text-sm text-gray-500 border-t">삭제하시면 복구할 수 없습니다.</p>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                    onClick={closeModal}
                  >
                    닫기
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 duration-300 bg-red-100 border border-transparent rounded-md hover:bg-red-200"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LinkDeleteModal;
