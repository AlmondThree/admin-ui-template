"use client";
import React from "react";

import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

interface ConfirmationModalProps {
  confirmationText: string;
  text:string;
  onAction: () => void;
  modalProps: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
}

const  ConfirmationModal: React.FC<ConfirmationModalProps> = ({confirmationText, text, onAction, modalProps}) => {
  const { isOpen, openModal, closeModal } = modalProps;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[600px] p-5 lg:p-10"
      >
        <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
          {confirmationText}
        </h4>
        <p className="text-lg leading-6 text-gray-500 dark:text-gray-400">
          {text}
        </p>
        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Close
          </Button>
          <Button size="sm" onClick={onAction}>
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  );
}


export default ConfirmationModal