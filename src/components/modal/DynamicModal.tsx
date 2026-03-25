"use client";
import React from "react";

import { Modal } from "../ui/modal";

interface DynamicModalProps {
  children: React.ReactNode
  modalProps: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
}

const  DynamicModal: React.FC<DynamicModalProps> = ({children, modalProps}) => {
  const { isOpen, closeModal } = modalProps;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[60%] p-5 lg:p-10"
      >
        {children}
      </Modal>
    </div>
  );
}


export default DynamicModal