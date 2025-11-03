import React, { ReactNode } from 'react';

interface DropdownMenuProps {
    children: ReactNode;
    className?: string;
    backgroundColor?: string;
    padding?: string;
}

export function DropdownMenu({
    children,
    className = '',
    backgroundColor = '#292929D9',
    padding = 'p-2',
}: DropdownMenuProps) {
    return (
        <div
            className={`bg-[${backgroundColor}] rounded-[35px] border border-solid border-[#393939] 
            backdrop-blur-[22.5px] backdrop-brightness-[100%] 
            text-white text-3xl ${padding} ${className} [-webkit-backdrop-filter:blur(22.5px)_brightness(100%)]`}
        >
            {children}
        </div>
    );
}