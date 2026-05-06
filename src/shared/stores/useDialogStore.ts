import { create } from 'zustand';

export type DialogType = 'alert' | 'confirm';

export interface DialogOptions {
  type?: DialogType;
  message?: string | React.ReactNode;
  okLabel?: string;
  cancelLabel?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

interface DialogState {
  isOpen: boolean;
  options: DialogOptions | null;
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  options: null,
  openDialog: (options) => set({ isOpen: true, options }),
  closeDialog: () => set({ isOpen: false, options: null }),
}));
