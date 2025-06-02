import { FC } from "react"
import styled from "styled-components"

interface IProfileProps {
    firstName: string,
    lastName: string,
    imgUrl: string,
    role: string
}

const ProfileStyled = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px;
`

const ProfileNameContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
`

const ProfileNameStyled = styled.span`
    font-size: 24px;
    font-weight: 400;
    color: white;
`

const ProfileRoleStyled = styled.span`
    font-size: 20px;
    font-weight: 400;
    color: #C5C5C5;
`

const ProfileImageStyled = styled.img`
    height: 70px;
    width: 70px;
    border-radius: 1000px;
    object-fit: cover;
`

export const Profile: FC<IProfileProps> = ({firstName, lastName, imgUrl, role}) => {
    return (
        <ProfileStyled>
            <ProfileNameContainerStyled>
                <ProfileNameStyled>{firstName} {lastName}</ProfileNameStyled>
                <ProfileRoleStyled>{role}</ProfileRoleStyled>
            </ProfileNameContainerStyled>
            <ProfileImageStyled src={imgUrl} alt=""/>
        </ProfileStyled>
    )
}