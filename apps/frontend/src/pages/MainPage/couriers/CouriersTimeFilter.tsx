import { useState } from "react";
import styled from "styled-components";

const TimeFilterButtonContainerStyled = styled.div`
    display: flex;
    gap: 15px;
`;

const FilterButton = styled.button <{ $isActive: boolean }>`
    background: ${({ $isActive }) => ($isActive ? '#E8E8E8' : '#292929')};
    border: 1px solid ${({ $isActive }) => ($isActive ? '#E8E8E8' : '#393939')};
    border-radius: 10px;
    padding: 8px 10px;
    color: ${({ $isActive }) => ($isActive ? 'black' : 'white')};
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`;

export function CouriersTimeFilter() {
    const [activeButton, setActiveButton] = useState('Неделя');

    return (
        <TimeFilterButtonContainerStyled>
            <FilterButton 
                $isActive={activeButton === 'Месяц'} 
                onClick={() => setActiveButton('Месяц')}
            >
                Месяц
            </FilterButton>
            <FilterButton 
                $isActive={activeButton === 'Неделя'} 
                onClick={() => setActiveButton('Неделя')}
            >
                Неделя
            </FilterButton>
            <FilterButton 
                $isActive={activeButton === 'День'} 
                onClick={() => setActiveButton('День')}
            >
                День
            </FilterButton>
        </TimeFilterButtonContainerStyled>
    );
}
