import styled from "styled-components"

const InWorkCardItemsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const HeaderCardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 160px;
`

const HeaderImageContainer = styled.div`
    display: flex;
    gap: 15px;
`

const HeaderImage = styled.img`
    height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 1000px;
`

const HeaderNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
`

const HeaderStaff = styled.span`
    color: #C5C5C5;
    font-size: 17px;
    font-weight: 400;
    white-space: nowrap;
`

const HeaderName = styled.span`
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
`

const HeaderDateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 2px;
    padding-right: 14px;
`

const HeaderDate = styled.span`
    font-size: 17px;
    font-weight: 400;
    white-space: nowrap;
`

const HeaderNumber = styled.span`
    font-size: 20px;
    font-weight: 400;
    white-space: nowrap;
`

const MainCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const MainCardItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 40px;
`

const MainNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const MainStaff = styled.span`
    font-size: 17px;
    font-weight: 400;
    color: #C5C5C5;
    white-space: nowrap;
`

const MainName = styled.span`
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
`

const MainDateContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const MainDateName = styled.span`
    font-size: 17px;
    font-weight: 400;
    color: #C5C5C5;
    white-space: nowrap;
`

const MainDate = styled.span`
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
`

const FooterCardContainer = styled.div`
    display: flex;
    justify-content: center;
`

const FooterButtonContainer = styled.div`
    display: flex;
    gap: 15px;
`

const FooterMoreButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333333;
    border: none;
    height: 50px;
    width: 60px;
    border-radius: 1000px;
    cursor: pointer;
`

const FooterCloseButton = styled.button`
    background-color: #BDFF67;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border: none;
    padding: 13px 33px;
    border-radius: 1000px;
    cursor: pointer;
`

export function InWorkCardItems() {
    return (
        <InWorkCardItemsStyled>
            <HeaderCardContainer>
                <HeaderImageContainer>
                    <HeaderImage src="/image/2.png" alt="" />
                    <HeaderNameContainer>
                        <HeaderStaff>Врач</HeaderStaff>
                        <HeaderName>Тикус С. А.</HeaderName>
                    </HeaderNameContainer>
                </HeaderImageContainer>
                <HeaderDateContainer>
                    <HeaderDate>13.05.2024</HeaderDate>
                    <HeaderNumber>205281</HeaderNumber>
                </HeaderDateContainer>
            </HeaderCardContainer>
            <MainCardContainer>
                <MainCardItemContainer>
                    <MainNameContainer>
                        <MainStaff>Пациент</MainStaff>
                        <MainName>Полякова Екатерина</MainName>
                    </MainNameContainer>
                    <MainDateContainer>
                        <MainDateName>Примерка 1</MainDateName>
                        <MainDate>15.05.2024 | 12:30</MainDate>
                    </MainDateContainer>
                </MainCardItemContainer>

                <MainCardItemContainer>
                    <MainNameContainer>
                        <MainStaff>Техник</MainStaff>
                        <MainName>Сережа Колбин</MainName>
                    </MainNameContainer>
                    <MainDateContainer>
                        <MainDateName>Примерка 2</MainDateName>
                        <MainDate>17.05.2024 | 14:20</MainDate>
                    </MainDateContainer>
                </MainCardItemContainer>

                <MainCardItemContainer>
                    <MainNameContainer>
                        <MainStaff>Вид работы</MainStaff>
                        <MainName>Временные коронки</MainName>
                    </MainNameContainer>
                    <MainDateContainer>
                        <MainDateName>Дата сдачи</MainDateName>
                        <MainDate>23.05.2024 | 10:00</MainDate>
                    </MainDateContainer>
                </MainCardItemContainer>
            </MainCardContainer>
            <FooterCardContainer>
                <FooterButtonContainer>
                    <FooterMoreButton>
                        <img src="/src/assets/img/ArrowDown.svg" alt="" />
                    </FooterMoreButton>
                    <FooterCloseButton>Закрыть наряд</FooterCloseButton>
                </FooterButtonContainer>
            </FooterCardContainer>
        </InWorkCardItemsStyled>
    )
}