import React, { useState } from "react"
import styled from "styled-components"
import ArrowDown from "@svg/ArrowDown.svg?react"

interface CustomSelectProps {
    options: string[]
    defaultOption?: string
    label?: string
    value?: string
    onChange?: (option: string) => void
}

const SelectContainer = styled.div`
    position: relative;
    width: fit-content;
`

const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 65px;
    background: #292929;
    border-radius: 12px;
    border: 1px solid #555555;
    padding: 8px 20px 8px 10px;
    cursor: pointer;
    user-select: none;
    width: 100%;
`

const SelectedOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const SelectedOption = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    width: 100%;
    background: #333333;
    border-radius: 12px;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
`

const DropdownItem = styled.li`
    padding: 14px 20px;
    color: white;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background: #3a3a3a;
    }
`

const SelectLabel = styled.span`
    display: block;
    color: white;
    font-size: 14px;
    font-weight: 500;
`

const ArrowIcon = styled(ArrowDown) <{ $isOpen: boolean }>`
    transition: transform 0.3s ease;
    ${(props) => props.$isOpen && "transform: rotate(180deg);"}
`

export const AddTypesWorkSelect: React.FC<CustomSelectProps> = ({ defaultOption, options, label, value = "", onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(value)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option)
        setIsOpen(false)
        if (onChange) onChange(option)
    }
    const modifiedOptions = [(defaultOption || "Нет"), ...options]

    return (
        <SelectContainer>
            <SelectWrapper onClick={toggleDropdown}>
                <SelectedOptionContainer>
                    <SelectLabel>{label}</SelectLabel>
                    <SelectedOption>{selectedOption || (defaultOption || "Нет")}</SelectedOption>
                </SelectedOptionContainer>
                <ArrowIcon $isOpen={isOpen} />
            </SelectWrapper>
            {isOpen && (
                <DropdownList>
                    {modifiedOptions.map((option, index) => (
                        <DropdownItem key={index} onClick={() => handleOptionSelect(option)}>
                            {option}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </SelectContainer>
    )
}
