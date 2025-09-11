import { FC, useState, useRef } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import ArrowDown from '@svg/ArrowDown.svg?react';

interface ICustomSelectProps {
  options: string[];
  placeholder?: string;
  onSelect?: (option: string) => void;
  className?: string;
  height?: number;
  value?: string;
}

const CustomSelect: FC<ICustomSelectProps> = ({
  options,
  placeholder = 'Выберите',
  onSelect,
  className,
  height = 71,
  value = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: string) => {
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  useOutsideClick(selectRef, () => setIsOpen(false), isOpen);

  return (
    <div className="relative w-full" ref={selectRef}>
      <div
        className={`flex items-center justify-between text-2xl px-6 ${className} bg-[#333333] rounded-[15px] cursor-pointer select-none 
            ${value ? 'text-white' : 'text-[#B9B9B9]'}`}
        style={{ height: `${height}px` }}
        onClick={toggleDropdown}
      >
        <span>{value || placeholder}</span>
        <ArrowDown className="w-12 h-9.5" />
      </div>
      {isOpen && (
        <ul
          className={`absolute w-full bg-[#292929]/85 backdrop-blur-[4px] rounded-[25px] 
            list-none max-h-[200px] overflow-y-auto z-[1] p-2.5 border-[#393939] border-solid border`}
          style={{ top: `${height + 10}px` }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="px-6 py-4 text-white text-xl cursor-pointer hover:bg-[#3A3A3A] hover:rounded-[19px]"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;