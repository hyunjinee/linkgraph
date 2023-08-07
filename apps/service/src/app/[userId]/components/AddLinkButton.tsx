'use client';

import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AddLink = () => {
  const router = useRouter();
  const onClick = async () => {
    const res = await fetch('/api/link', { method: 'POST' });
    // const data = await res.json();

    console.log(res);
    router.refresh();
  };

  return (
    <button
      onClick={onClick}
      // add some transitions
      className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-md bottom-5 right-5"
    >
      <PlusIcon />
    </button>
  );
};

export default AddLink;
