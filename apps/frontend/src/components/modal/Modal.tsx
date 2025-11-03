import React, { FC, useEffect, useRef } from 'react';
import Delete from '@svg/Delete.svg?react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 's' | 'm' | 'l';
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => onClose);
  if (!isOpen) return null;

  const modalStyles = () => {
    switch (size) {
      case 's':
      default:
        return {
          style: 'w-[720px]',
        };
      case 'm':
        return {
          style: 'w-[820px]',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-90 h-fit flex justify-center" ref={wrapperRef}>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative flex flex-col bg-[#1C1C1C] mt-[230px] mb-[110px] rounded-2xl shadow-xl py-[30px] px-4 animate-fadeIn 
          ${modalStyles().style} `}
      >
        <div className="flex items-center justify-center">
          <h2 className=" text-[32px] font-medium text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 cursor-pointer"
            aria-label="Закрыть"
          >
            <Delete className="w-14 h-14" />
          </button>
        </div>

        <div className="text-white h-full w-full overflow-y-auto mt-[30px] px-3.5 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
