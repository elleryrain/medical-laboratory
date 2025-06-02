import Plus from "@img/plus.svg?react"
import { FC } from "react"
import styled from "styled-components"
import { InWorkFilterItem } from "./InWorkFilterItem"

interface InWorkFilterProps {
    title: string
}

const InWorkFilterStyled = styled.div`
    display: flex;
    gap: 20px;
`

const TitleStyled = styled.span`
    font-size: 40px;
    font-weight: 500;
    color: white;
`

const FilterItemStyled = styled.div`
    display: flex;
    margin-left: 10px;
    gap: 20px;
`

const AddButtonStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 49px;
    width: 49px;
    border: 2px solid #DDDDDD;
    border-radius: 1000px;
    cursor: pointer;
`


export const InWorkFilter: FC<InWorkFilterProps> = ({title}) => {
	return (
		<InWorkFilterStyled>
            <TitleStyled>{title}</TitleStyled>
            <FilterItemStyled>
                <InWorkFilterItem />
            </FilterItemStyled>
            <AddButtonStyled>
                <Plus stroke="white"/>
            </AddButtonStyled>
		</InWorkFilterStyled>
	)
}