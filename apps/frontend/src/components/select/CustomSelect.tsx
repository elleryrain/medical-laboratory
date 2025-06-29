import React, { useState } from "react"
import ArrowDown from "@img/ArrowDown.svg?react"

interface CustomSelectProps {
    options: string[]
    placeholder?: string
    onSelect?: (option: string) => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, placeholder = "Выберите", onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string>("")

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option)
        setIsOpen(false)
        if (onSelect) onSelect(option)
    }

    return (
        <div className="relative w-full">
            <div
                className={`flex items-center justify-between text-2xl px-6 h-[71px] bg-[#333333] rounded-[15px] cursor-pointer select-none 
                    ${selectedOption ? "text-white" : "text-[#B9B9B9]"}`}
                onClick={toggleDropdown}
            >
                <span>{selectedOption || placeholder}</span>
                <ArrowDown className="w-6 h-6" />
            </div>
            {isOpen && (
                <ul className="absolute top-full w-full bg-[#333333] rounded-[15px] list-none p-0 m-0 max-h-[200px] overflow-y-auto z-[1]">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="px-6 py-4 text-white text-2xl cursor-pointer hover:bg-[#444444]"
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CustomSelect