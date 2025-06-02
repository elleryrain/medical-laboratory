import NotifySvg from '@img/Notification.svg?react'
import styled from "styled-components"

const NotifyStyled = styled.div`
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1000px;
    background-color: #1A1A1A;
`

const NotifyContainerStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    position: relative;
    cursor: pointer;

    > svg {
        background: transparent;
    }
`

const NotifyFullStyled = styled.div`
    height: 13px;
    width: 13px;
    border-radius: 1000px;
    background-color: #DA2525;
    position: absolute;
    top: -3px;
    right: 0;
    border: 2px solid #1A1A1A;
`

export function Notify() {

    const a = true
    
    return (
        <NotifyStyled>
            <NotifyContainerStyled>
                <NotifySvg />
                {a && <NotifyFullStyled/>}
            </NotifyContainerStyled>
        </NotifyStyled>
    )
}