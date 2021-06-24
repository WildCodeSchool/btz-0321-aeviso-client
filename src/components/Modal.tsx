import React, { Dispatch, ReactChildren, SetStateAction, useState } from 'react';
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
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-60" />

      <div className="p-8 flex flex-col justify-start z-50 text-white bg-blue rounded-md break-all">
        <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>

        {children && <div className="mb-6">{children}</div>}

        <div className="flex">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`h-12 px-4 ${index === 0 ? 'mr-2' : 'mx-2'} ${
                button.backgroundColor || 'bg-green'
              } rounded-full`}
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
