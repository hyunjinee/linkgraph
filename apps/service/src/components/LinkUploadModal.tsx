'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useLinkUploadModalActions, useLinkUploadModalIsOpen } from '~/hooks/useLinkUploadModalStore';
import Input from './atoms/Input';
import { useCreateLink } from '~/queries/link';
import { useAuth } from '~/hooks/useAuth';
import { getCurrentDateTime } from '@linkgraph/utils';
import { cloudFrontURL } from '@linkgraph/site-info';

const LinkUploadModal = () => {
  const isOpen = useLinkUploadModalIsOpen();
  const { closeModal } = useLinkUploadModalActions();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      url: '',
      image: null,
      color: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const image = values.image?.[0];
    const fileSizeMB = image.size / 1024 / 1024;
    if (fileSizeMB > 4) {
      return;
    }

    if (!image) {
      const res = await fetch('/api/link', {
        method: 'POST',
        body: JSON.stringify({
          url: values.url,
          title: values.title,
          color: values.color,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res.json();
    }

    // get presigned url
    const presignedURLResponse = await fetch('/api/presigned-url', {
      method: 'POST',
      body: JSON.stringify({
        name: 'link/' + getCurrentDateTime() + '-' + image.name,
        type: image.type,
      }),
    });
    const { url: presignedURL } = await presignedURLResponse.json();

    const uploadResponse = await fetch(presignedURL, {
      method: 'PUT',
      body: image,
      headers: {
        'Content-type': image.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('서버에 이미지 업로드를 실패했습니다.');
    }

    // 서버에 업로드를 완료했다면 링크를 생성한다.
    const res = await fetch('/api/link', {
      method: 'POST',
      body: JSON.stringify({
        url: values.url,
        title: values.title,

        color: values.color,
        image: cloudFrontURL + new URL(presignedURL).pathname,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    closeModal();
    reset();

    return res.json();
  };

  return (
    <>
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
                    링크 추가
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3 pt-3 mt-2 border-t">
                      <div>
                        <div className="pb-1">링크 이름</div>
                        <Input placeholder="ex) 개인 블로그" {...register('title', { required: true })} />
                      </div>

                      <div>
                        <div className="pb-1">링크</div>
                        <Input placeholder="https://google.com" {...register('url', { required: true })} />
                      </div>

                      <div>
                        <div className="pb-1">사진</div>
                        <Input
                          type="file"
                          accept="image/*"
                          placeholder="https://google.com"
                          {...register('image', { required: true })}
                        />
                      </div>

                      <div>
                        <div className="pb-1">색깔</div>
                        <Input placeholder="#fffff" {...register('color')} />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm text-red-900 duration-300 bg-red-100 border border-transparent rounded-md hover:bg-red-200"
                        onClick={closeModal}
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                      >
                        확인
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LinkUploadModal;
