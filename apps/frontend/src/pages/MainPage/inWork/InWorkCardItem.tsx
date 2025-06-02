import styled from "styled-components";
import BgSvg1 from "@img/background-card1.svg?react";
import BgSvg2 from "@img/background-card2.svg?react";
import { InWorkButton } from "./InWorkButton";
import { InWorkCardItems } from "./InWorkCardItems";

const InWorkCardItemContainerStyled = styled.div`
    position: relative;
`

const InWorkCardItemStyled = styled.div`
    position: relative;
    display: inline-block;
    padding: 35px;
    border-radius: 45px;
    overflow: hidden;
    height: 414px;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 45px;
        padding: 1px;
        background: linear-gradient(180deg, #585858 0%, #232323 50%, #585858 100%);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        z-index: 2;
        pointer-events: none;
    }
`

const BlurOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(60px);
    z-index: 1;
    pointer-events: none;
    background: rgba(28, 28, 28, 0.79);
`

const SvgOverlayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 50px;
    padding-top: 30px;
    gap: 60px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
`

const InWorkCardItemContentStyled = styled.div`
    position: relative;
    color: white;
    z-index: 3;
`

const InWorkButtonContainerStyled = styled.div`
    position: absolute;
    right: 0;
    top: -12px;
    display: flex;
    gap: 10px;
    margin-right: 25px;
    align-items: flex-end;
    z-index: 4;
`

export function InWorkCardItem() {
    return (
        <InWorkCardItemContainerStyled>
            <InWorkCardItemStyled>
                <SvgOverlayContainer>
                    <BgSvg1 />
                    <BgSvg2 />
                </SvgOverlayContainer>
                <BlurOverlay />
                <InWorkCardItemContentStyled>
                    <InWorkCardItems/>
                </InWorkCardItemContentStyled>
            </InWorkCardItemStyled>
            <InWorkButtonContainerStyled>
                <InWorkButton />
                <InWorkButton />
            </InWorkButtonContainerStyled>
        </InWorkCardItemContainerStyled>
    )
}
