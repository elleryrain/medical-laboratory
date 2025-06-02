import styled from "styled-components"
import SearchSvg from '@img/search.svg?react'

const SearchStyled = styled.div`
    padding-left: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: #333333;
    border-radius: 165px;
    padding-top: 21px;
    padding-bottom: 20px;
    flex: 1;

    > svg {
        background-color: transparent;
        width: 24px;
        height: 24px;
    }
`

const SearchInputStyled = styled.input`
    border: none;
    background-color: transparent;
    font-size: 24px;
    flex: 1;
    outline: none;
    color: #D0D0D0;
    
    &::placeholder{
        color: #D0D0D0;
    }
`

export function Search() {
    return (
        <SearchStyled>
            <SearchSvg />
            <SearchInputStyled placeholder="Поиск" />
        </SearchStyled>
    )
}