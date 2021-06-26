import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface Iprops {
  title: string;
  buttons: IButton[];
  children: React.ReactNode;
}

interface IButton {
  text: string;
  handleClick?: (closeModal: () => void) => void;
  backgroundColor?: string;
  textColor?: string;
}

function Modal({ title, buttons, children }: Iprops): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = (): void => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={handleClose} className="flex justify-center items-center fixed inset-0">
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-50" />

      <div className="p-10 w-10/12 sm:5/12 shadow-mainShadow flex flex-col justify-start z-50 text-white bg-black rounded-md break-all">
        <Dialog.Title className="text-2xl mb-1 font-bold">{title}</Dialog.Title>

        {children && <div className="mb-6">{children}</div>}

        <div className="flex">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`focus:outline-none h-8 px-6 ${index === 0 ? 'mr-2' : 'mx-2'} ${
                button.backgroundColor || 'bg-green'
              } rounded-sm`}
              onClick={() => (button.handleClick ? button.handleClick(handleClose) : handleClose())}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
