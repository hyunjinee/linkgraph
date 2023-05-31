'use client';

import { createLinkAction } from '~/_action';

const LinkForm: React.FC = () => {
  const action = async (data: FormData) => {
    const url = data.get('url');

    if (!url || typeof url !== 'string') {
      return;
    }

    await createLinkAction(url);
  };

  return (
    <form action={action}>
      <h2 className="mb-2 font-medium">Create New Link</h2>
      <input className="border rounded border-slate-400 px-2 py-0.5" type="text" name="url" />
      <button type="submit" className="px-2 py-1 ml-2 text-sm text-white rounded bg-slate-700">
        Add Link
      </button>
    </form>
  );
};

export default LinkForm;
