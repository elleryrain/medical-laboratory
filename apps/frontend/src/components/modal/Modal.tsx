import React, { useEffect } from "react";
import Delete from "@svg/Delete.svg?react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    children
}: ModalProps) => {

    // Закрытие по Esc
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);
    // Не рендерим, если модалка закрыта
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex justify-center">
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div
                className={`relative flex flex-col bg-[#1C1C1C] mt-[230px] mb-[110px] rounded-2xl shadow-xl w-[690px] p-7.5 mx-4 animate-fadeIn`}
            >
                <h2 className="text-center text-[32px] font-medium text-white pt-[5px]">{title}</h2>
                <button
                    onClick={onClose}
                    className="absolute top-[43px] right-7.5 cursor-pointer"
                    aria-label="Закрыть"
                >
                    <Delete className="w-7 h-7" />
                </button>

                <div className="text-white h-full w-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};