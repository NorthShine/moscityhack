import { Modal } from 'components/Modal';
import React from 'react';

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => (
  <>
    {children}
    <Modal />
  </>
);
