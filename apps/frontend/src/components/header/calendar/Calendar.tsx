import styled from "styled-components"
import CalendarSvg from '@img/Calendar.svg?react'

const CalendarStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-left: 25px;
    padding-right: 7px;
    padding-top: 7px;
    padding-bottom: 7px;
    height: 70px;

    border: 2px solid #FFFFFF;
    border-radius: 1000px;
`

const CalendarDateStyled = styled.span`
    font-size: 24px;
    font-weight: 500;
    color: white;
`

const CalendarSvgStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #D9D9D9;
    border-radius: 1000px;
    padding-right: 8px;
    padding-top: 8px;
    padding-bottom: 9px;
    padding-left: 9px;

    > svg {
        width: 39px;
        height: 39px;
        background: transparent;
    }
`

export function Calendar() {

    const date = new Date()
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ]
    const day = date.getDate()
    const month = months[date.getMonth()]
    
    return (
        <CalendarStyled>
            <CalendarDateStyled>{day} {month}</CalendarDateStyled>
            <CalendarSvgStyled>
                <CalendarSvg />
            </CalendarSvgStyled>
        </CalendarStyled>
    )
}