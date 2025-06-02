import React, { useState } from "react"
import styled from "styled-components"
import ArrowDown from "@img/ArrowDown.svg?react"

interface CustomSelectProps {
    options: string[]
    placeholder?: string
    onSelect?: (option: string) => void
}

const SelectContainer = styled.div`
    position: relative;
    width: 100%;
`

const SelectedOption = styled.div<{ $isPlaceholder: boolean }>`
    background: #333333;
    border-radius: 15px;
    height: 71px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => (props.$isPlaceholder ? "#B9B9B9" : "white")};
    font-size: 24px;
    cursor: pointer;
    user-select: none;
`

const OptionList = styled.ul`
    position: absolute;
    top: 100%;
    width: 100%;
    background: #333333;
    border-radius: 15px;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
`

const OptionItem = styled.li`
    padding: 16px 24px;
    color: white;
    font-size: 24px;
    cursor: pointer;

    &:hover {
        background: #444444;
    }
`

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
        <SelectContainer>
            <SelectedOption $isPlaceholder={!selectedOption} onClick={toggleDropdown}>
                {selectedOption || placeholder}
                <ArrowDown/>
            </SelectedOption>
            {isOpen && (
                <OptionList>
                    {options.map((option, index) => (
                        <OptionItem key={index} onClick={() => handleOptionSelect(option)}>
                            {option}
                        </OptionItem>
                    ))}
                </OptionList>
            )}
        </SelectContainer>
    )
}

export default CustomSelect
