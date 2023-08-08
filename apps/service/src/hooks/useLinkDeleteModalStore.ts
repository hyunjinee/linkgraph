import toast from 'react-hot-toast';
import { create } from 'zustand';

interface LinkDeleteModalStore {
  id: string;
  isOpen: boolean;
  actions: {
    openModal: (id: string) => void;
    closeModal: () => void;
    deleteLink: () => Promise<void>;
  };
}

const useLinkDeleteModalStore = create<LinkDeleteModalStore>((set, get) => ({
  id: '',
  isOpen: false,
  actions: {
    openModal: (id: string) => set({ isOpen: true, id }),
    closeModal: () => set({ isOpen: false, id: '' }),
    deleteLink: async () => {
      try {
        const res = await fetch('/api/link?id=' + get().id, {
          method: 'DELETE',
        });

        if (res.ok) {
          toast.success('링크가 삭제되었습니다.');
          return;
        }
      } catch (error) {
        toast.error('링크 삭제에 실패했습니다.');
        get().actions.closeModal();
      }
    },
  },
}));

export const useLinkDeleteModalIsOpen = () => useLinkDeleteModalStore((state) => state.isOpen);
export const useLinkDeleteModalActions = () => useLinkDeleteModalStore((state) => state.actions);
