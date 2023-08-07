'use client';

import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLinkUploadModalActions } from '~/hooks/useLinkUploadModalStore';

const AddLink = () => {
  const router = useRouter();
  const { openModal, closeModal } = useLinkUploadModalActions();

  const onClick = async () => {
    // const res = await fetch('/api/link', { method: 'POST', body: JSON.stringify({}) });
    // const data = await res.json();

    // console.log(res);
    openModal();

    // router.refresh();
  };

  return (
    <button
      onClick={onClick}
      className="absolute flex items-center justify-center w-10 h-10 transition bg-white rounded-md bottom-5 right-5 hover:bg-white/80"
    >
      <PlusIcon />
    </button>
  );
};

export default AddLink;
