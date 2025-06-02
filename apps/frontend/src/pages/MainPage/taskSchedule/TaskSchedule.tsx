import Plus from "@img/plus.svg?react"
import styled from "styled-components"
import { TaskScheduleList } from "./TaskScheduleList"

const TaskScheduleStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 944px;
    width: 100%;
    background: #1C1C1C;
    padding: 35px;
    border-radius: 45px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

const HeaderTitle = styled.h1`
    font-size: 40px;
    font-weight: 500;
    line-height: 48.76px;
    color: white;
`

const HeaderButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 49px;
    height: 49px;
    border: 2px solid #DDDDDD;
    border-radius: 1000px;
    cursor: pointer;
    background: transparent;
`

const AddTasksContainer = styled.div`
    display: flex;
    gap: 25px;
`

const EditButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
    padding-bottom: 5px;
`


export function TaskSchedule() {
    return (
        <TaskScheduleStyled>
            <Header>
                <AddTasksContainer>
                    <HeaderTitle>Задачи на день</HeaderTitle>
                    <HeaderButton><Plus stroke="#DDDDDD" /></HeaderButton>
                </AddTasksContainer>
                <EditButton>Править</EditButton>
            </Header>
            <TaskScheduleList />
        </TaskScheduleStyled>
    )
}