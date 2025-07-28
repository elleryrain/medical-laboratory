import styled from "styled-components";
import Delete from "@svg/Delete.svg?react";
import Plus from "@svg/plus.svg?react";
import CustomSelect from "../../../components/select/CustomSelect";
import { useState } from "react";
import { ReactSVG } from "react-svg";

const ToothImageWrapper = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  fill: ${(props) => (props.$isActive ? "white" : "none")};
  transition: fill 0.3s ease;
`

const ToothImage = ({ src, $isActive, onClick }: { src: string, $isActive: boolean, onClick: () => void }) => (
    <ToothImageWrapper $isActive={$isActive} onClick={onClick}>
        <ReactSVG src={src} />
    </ToothImageWrapper>
)

const AddShiftStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1C1C1C;
  width: fit-content;
  padding: 35px 30px 30px 30px;
  border-radius: 30px;
  width: 820px;
  gap: 30px;
`

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const HeaderTitle = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 500;
`

const CloseButton = styled(Delete)`
  height: 32px;
  width: 32px;
  position: absolute;
  right: 0px;
  top: 8px;
  cursor: pointer;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  height: 71px;
  border-radius: 15px;
  background: #333333;
  border: none;
  padding: 0 24px;
  font-size: 24px;
  font-weight: 500;
  color: white;
  outline: none;

  &::placeholder {
    color: #B9B9B9;
  }
`

const AddTypeOfWork = styled.div`
  width: 100%;
  height: 71px;
  border-radius: 15px;
  border: 2px dashed #D2D2D2; 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
  color: white;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #2A2A2A;
  }
`

const InputToothContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 730px;
  padding-top: 35px;
`

const ToothContainer = styled.div`
  display: flex;
  gap: 5px;
`

const TopToothContainer = styled.div`
  display: flex;
  gap: 18px;
`

const ToothBottomContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 7px;
`

const BottomToothContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
`

const Tooth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ToothNumber = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 500;
`

const SubmitButton = styled.div`
  width: 100%;
  height: 71px;
  border-radius: 15px;
  background: #BDFF67;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
`

export function AddShift({ toggleModal }: { toggleModal: () => void }) {
    const [workTypeCount, setWorkTypeCount] = useState(1)

    const addWorkType = () => {
        setWorkTypeCount(workTypeCount + 1)
    }

    const tooth = [
        { id: 1, svgUrl: "/src/assets/img/Tooth/1.svg" },
        { id: 2, svgUrl: "/src/assets/img/Tooth/2.svg" },
        { id: 3, svgUrl: "/src/assets/img/Tooth/3.svg" },
        { id: 4, svgUrl: "/src/assets/img/Tooth/4.svg" },
        { id: 5, svgUrl: "/src/assets/img/Tooth/5.svg" },
        { id: 6, svgUrl: "/src/assets/img/Tooth/6.svg" },
        { id: 7, svgUrl: "/src/assets/img/Tooth/7.svg" },
        { id: 8, svgUrl: "/src/assets/img/Tooth/8.svg" },
        { id: 9, svgUrl: "/src/assets/img/Tooth/9.svg" },
        { id: 10, svgUrl: "/src/assets/img/Tooth/10.svg" },
        { id: 11, svgUrl: "/src/assets/img/Tooth/11.svg" },
        { id: 12, svgUrl: "/src/assets/img/Tooth/12.svg" },
        { id: 13, svgUrl: "/src/assets/img/Tooth/13.svg" },
        { id: 14, svgUrl: "/src/assets/img/Tooth/14.svg" },
        { id: 15, svgUrl: "/src/assets/img/Tooth/15.svg" },
        { id: 16, svgUrl: "/src/assets/img/Tooth/16.svg" },
        { id: 17, svgUrl: "/src/assets/img/Tooth/17.svg" },
        { id: 18, svgUrl: "/src/assets/img/Tooth/18.svg" },
        { id: 19, svgUrl: "/src/assets/img/Tooth/19.svg" },
        { id: 20, svgUrl: "/src/assets/img/Tooth/20.svg" },
        { id: 21, svgUrl: "/src/assets/img/Tooth/21.svg" },
        { id: 22, svgUrl: "/src/assets/img/Tooth/22.svg" },
        { id: 23, svgUrl: "/src/assets/img/Tooth/23.svg" },
        { id: 24, svgUrl: "/src/assets/img/Tooth/24.svg" },
        { id: 25, svgUrl: "/src/assets/img/Tooth/25.svg" },
        { id: 26, svgUrl: "/src/assets/img/Tooth/26.svg" },
        { id: 27, svgUrl: "/src/assets/img/Tooth/27.svg" },
        { id: 28, svgUrl: "/src/assets/img/Tooth/28.svg" },
        { id: 29, svgUrl: "/src/assets/img/Tooth/29.svg" },
        { id: 30, svgUrl: "/src/assets/img/Tooth/30.svg" },
        { id: 31, svgUrl: "/src/assets/img/Tooth/31.svg" },
        { id: 32, svgUrl: "/src/assets/img/Tooth/32.svg" }
    ]

    const [activeTeeth, setActiveTeeth] = useState<number[]>([])

    const handleToothClick = (id: number) => {
        setActiveTeeth((prev) => {
            if (prev.includes(id)) {
                return prev.filter(toothId => toothId !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    return (
        <AddShiftStyled>
            <Header>
                <HeaderTitle>Новый наряд</HeaderTitle>
                <CloseButton onClick={toggleModal} />
            </Header>
            <InputContainer>
                <CustomSelect
                    placeholder="Врач"
                    options={["Врач 1", "Врач 2"]}
                />
                <Input placeholder="Пациент" />
                {[...Array(workTypeCount)].map((_, index) => (
                    <CustomSelect
                        key={index}
                        placeholder="Вид работы"
                        options={["1", "2"]}
                    />
                ))}
                <AddTypeOfWork onClick={addWorkType}>
                    <Plus stroke="white" />
                    Добавить вид работы
                </AddTypeOfWork>
                <Input placeholder="Цвет работы" />
            </InputContainer>
            <InputToothContainer>
                <TopToothContainer>
                    <ToothContainer>
                        {tooth.slice(0, 8).map((tooth, index) => (
                            <Tooth key={tooth.id} style={{ marginTop: `${index * 5}px` }}>
                                <ToothImage
                                    src={tooth.svgUrl}
                                    $isActive={activeTeeth.includes(tooth.id)}
                                    onClick={() => handleToothClick(tooth.id)}
                                />
                                <ToothNumber>{tooth.id}</ToothNumber>
                            </Tooth>
                        ))}
                    </ToothContainer>
                    <ToothContainer>
                        {tooth.slice(8, 16).map((tooth, index) => (
                            <Tooth key={tooth.id} style={{ marginTop: `${(7 - index) * 5}px` }}>
                                <ToothImage
                                    src={tooth.svgUrl}
                                    $isActive={activeTeeth.includes(tooth.id)}
                                    onClick={() => handleToothClick(tooth.id)}
                                />
                                <ToothNumber>{tooth.id}</ToothNumber>
                            </Tooth>
                        ))}
                    </ToothContainer>
                </TopToothContainer>
                <BottomToothContainer>
                    <ToothBottomContainer>
                        {tooth.slice(16, 24).map((tooth, index) => (
                            <Tooth key={tooth.id} style={{ marginTop: `${(7 - index) * 5}px` }}>
                                <ToothImage
                                    src={tooth.svgUrl}
                                    $isActive={activeTeeth.includes(tooth.id)}
                                    onClick={() => handleToothClick(tooth.id)}
                                />
                                <ToothNumber>{tooth.id}</ToothNumber>
                            </Tooth>
                        ))}
                    </ToothBottomContainer>
                    <ToothBottomContainer>
                        {tooth.slice(24, 32).map((tooth, index) => (
                            <Tooth key={tooth.id} style={{ marginTop: `${index * 5}px` }}>
                                <ToothImage
                                    src={tooth.svgUrl}
                                    $isActive={activeTeeth.includes(tooth.id)}
                                    onClick={() => handleToothClick(tooth.id)}
                                />
                                <ToothNumber>{tooth.id}</ToothNumber>
                            </Tooth>
                        ))}
                    </ToothBottomContainer>
                </BottomToothContainer>
            </InputToothContainer>
            <SubmitButton>Сохранить</SubmitButton>
        </AddShiftStyled>
    );
}