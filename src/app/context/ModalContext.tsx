"use client"
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type ModalContextProps = {
  children: ReactNode;
};

type ModalContext = {
  openModal: (modalName: string) => void;
  closeModal: () => void;
  currentModal: string | null;
};

const ModalContext = createContext({} as ModalContext);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: ModalContextProps) => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const openModal = React.useCallback((modalName: string) => {
    setCurrentModal(modalName);
  }, [currentModal]);

  const closeModal = useCallback(() => {
    setCurrentModal(null);
  },[currentModal]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        currentModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};