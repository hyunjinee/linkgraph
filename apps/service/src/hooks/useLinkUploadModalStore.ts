import { create } from 'zustand';

interface LinkUploadModalState {
  isOpen: boolean;
  actions: {
    openModal: () => void;
    closeModal: () => void;
  };
}

const useLinkUploadModalStore = create<LinkUploadModalState>((set) => ({
  isOpen: false,
  actions: {
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  },
}));

export const useLinkUploadModalIsOpen = () => useLinkUploadModalStore((state) => state.isOpen);
export const useLinkUploadModalActions = () => useLinkUploadModalStore((state) => state.actions);
