import styled from "styled-components"
import { useTaskStore } from "@/store/TaskScheduleStore"
import CheckArrow from "@img/CheckArrow.svg?react"
import TaskLine from "@img/TaskLine.svg?react"

const TaskScheduleListStyled = styled.div`
    display: flex;
    align-items: baseline;
    gap: 35px;
    padding: 35px;
    background: #292929;
    border: 2px solid #2E2E2E;
    border-radius: 30px;
`

const TaskTimeListContainer = styled.div``

const TaskNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`

const TaskNameLineContainer = styled.div <{$isLineActive: boolean}>`
    display: flex;
    position: ${props => props.$isLineActive ? "relative" : "block"};
    align-items: center;
    right: ${props => props.$isLineActive ? "35px" : ""};
    top: ${props => props.$isLineActive ? "-2px" : ""};
`

const TaskLineActive = styled.div`
    height: 2.5px;
    width: 128px;
    background-color: #BDFF67;
`

const TaskName = styled.span<{ $taskColor: string }>`
    display: flex;
    align-items: center;
    padding: 0 30px;
    height: 69px;
    font-size: 24px;
    font-weight: 500;
    background-color: ${props => props.$taskColor};
    color: ${props => props.$taskColor === "#BDFF67" ? "black" : "white"};
    border-radius: 1000px;
    width: fit-content;
`

const TaskTimeLineContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 121px;
    gap: 5px;
`

const TaskTimeContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const TaskLineStyled = styled(TaskLine)`
    display: flex;
    align-self: flex-end;
    margin-right: 14px;
    margin-bottom: 2.2px;
`

const TaskTime = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const TaskCompletedButton = styled.div<{ $isCompleted: boolean, $isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 29px;
    width: 29px;
    border-radius: 1000px;
    background: ${props => props.$isCompleted ? "#BDFF67" : "transparent"};
    border: ${props => props.$isActive ? "2.5px solid #BDFF67" : "2.5px solid #5D5D5D"};
    cursor: pointer;
`

export function TaskScheduleList() {
    const { tasks } = useTaskStore()
    const currentTime = new Date().getHours() * 60 + new Date().getMinutes() 

    // Функция для нахождения задачи, которая включает текущее время
    const getCurrentTaskIndex = () => {
        // Пройдем по задачам и найдем ту, которая охватывает текущее время
        for (let i = 0; i < tasks.length - 1; i++) {
            const [taskHour, taskMinute] = tasks[i].time.split(":").map(Number)
            const taskTimeInMinutes = taskHour * 60 + taskMinute
            const [nextTaskHour, nextTaskMinute] = tasks[i + 1].time.split(":").map(Number)
            const nextTaskTimeInMinutes = nextTaskHour * 60 + nextTaskMinute
    
            // Если текущее время находится между текущей и следующей задачей
            if (currentTime >= taskTimeInMinutes && currentTime < nextTaskTimeInMinutes) {
                return i // Возвращаем индекс текущей задачи
            }
    
            // Добавим дополнительную проверку на точное совпадение времени задачи с текущим временем
            if (currentTime === taskTimeInMinutes) {
                return i // Возвращаем индекс задачи, если текущее время совпадает с временем задачи
            }
        }
        return -1 // Если текущее время не попадает в ни один интервал задач
    }

    const currentTaskIndex = getCurrentTaskIndex()
    return (
        <TaskScheduleListStyled>
            <TaskTimeListContainer>
                {tasks.map((task, index) => {

                    const [taskHour, taskMinute] = task.time.split(":").map(Number)
                    const taskTimeInMinutes = taskHour * 60 + taskMinute

                    return (
                        <TaskTimeLineContainer key={index}>
                            <TaskTimeContainer>
                                <TaskTime>{task.time}</TaskTime>
                                <TaskCompletedButton onClick={() => useTaskStore.getState().toggleTaskCompletion(task.id)} $isCompleted={task.isCompleted} $isActive={taskTimeInMinutes <= currentTime}>
                                    {task.isCompleted ? <CheckArrow stroke="black" height="17px" width="17px" /> : ""}
                                </TaskCompletedButton>
                            </TaskTimeContainer>
                            {index !== tasks.length - 1 && (
                                <TaskLineStyled stroke={(taskTimeInMinutes < currentTime) ? "white" : "#919191"} />
                            )}

                        </TaskTimeLineContainer>
                    )
                })}
            </TaskTimeListContainer>
            <TaskNameContainer>
                {tasks.map((task, index) => {
                    const [taskHour, taskMinute] = task.time.split(":").map(Number)
                    const taskTimeInMinutes = taskHour * 60 + taskMinute

                    return (
                        <TaskNameLineContainer key={index} $isLineActive={index === currentTaskIndex && taskTimeInMinutes <= currentTime}>
                            {index === currentTaskIndex && taskTimeInMinutes <= currentTime && <TaskLineActive />}
                            <TaskName $taskColor={task.color}>{task.taskName}</TaskName>
                        </TaskNameLineContainer>
                    )
                })}
            </TaskNameContainer>
        </TaskScheduleListStyled>
    )
}