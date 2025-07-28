import styled from "styled-components"
import Ellipse from "@svg/CouriersCardEllipse.svg?react"
import Clipboard from "@svg/Clipboard.svg?react"
import Check from "@svg/CheckArrow.svg?react"
import { useState } from "react"

const CouriersOrderCardStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 30px;
    border: 2px solid #2E2E2E;
    background: #292929;
    padding: 25px 20px;
    max-width: 314px;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const HeaderNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`

const HeaderName = styled.span`
    font-size: 24px;
    font-weight: 500;
    white-space: nowrap;
    color: white;
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    padding: 0 5px;
`

const MainName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const MainDateContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #CACACA;
`

const MainDate = styled.span`
    font-size: 20px;
    font-weight: 400;
`

const MainNumber = styled.span`
    font-size: 20px;
    font-weight: 400;
`

const Footer = styled.div`
    display: flex;
    gap: 15px;
    padding: 0 5px;
    height: 44px;
`

const FooterPrice = styled.span <{ $isPay: boolean }>`
    display: flex;
    align-items: center;
    border: 2px solid #5D5D5D;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 500;
    padding: 10px 15px;
    color: white;
    white-space: nowrap;
    text-decoration: ${props => props.$isPay ? "line-through" : ""};
`

const FooterPaymentButton = styled.div <{ $isPay: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.$isPay ? "transparent" : "#BDFF67"};
    border: ${props => props.$isPay ? "1px solid #BDFF67" : ""};
    border-radius: 10px;
    font-size: 20px;
    font-weight: 500;
    width: 100%;
    cursor: pointer;
    user-select: none;  
`

const FooterInfoButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #5D5D5D;
    border-radius: 10px;
    min-width: 46px;
    cursor: pointer;
`

export function CouriersOrderCard() {

    const [isPay, setIsPay] = useState(false)

    return (
        <CouriersOrderCardStyled>
            <Header>
                <HeaderNameContainer>
                    <HeaderName>Смирнова Екатерина</HeaderName>
                    <Ellipse />
                </HeaderNameContainer>
                <MainContainer>
                    <MainName>Бьютимед</MainName>
                    <MainDateContainer>
                        <MainDate>22.07 | 11:20</MainDate>
                        <MainNumber>205641</MainNumber>
                    </MainDateContainer>
                </MainContainer>
            </Header>
            <Footer>
                <FooterPrice $isPay={isPay}>267 ₽</FooterPrice>
                <FooterPaymentButton onClick={() => setIsPay(!isPay)} $isPay={isPay}>
                    {!isPay ? "Оплата" : <Check stroke="#BDFF67" />}
                </FooterPaymentButton>
                <FooterInfoButton><Clipboard /></FooterInfoButton>
            </Footer>
        </CouriersOrderCardStyled>
    )
}