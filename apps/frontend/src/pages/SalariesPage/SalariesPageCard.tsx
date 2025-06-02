import { useState } from "react";
import styled from "styled-components";
import { useStore } from "../../store/SalariesPageStore";

const SalariesPageCardStyled = styled.div`
    display: flex;
    gap: 30px;
`

const Card = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    height: fit-content;
    background: #1c1c1c;
    border-radius: 45px;
    padding: 35px 20px;
    width: 540px;
`

const HeaderNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: white;
    padding: 0 15px;
`

const NameImageContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const Image = styled.img`
    height: 90px;
    width: 90px;
    object-fit: cover;
    border-radius: 1000px;
`

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 24px;
    font-weight: 500;
`

const LastFirstName = styled.span`
    display: flex;
    gap: 5px;
`

const LastName = styled.span``
const MiddleName = styled.span``
const FirstName = styled.span``

const WorkCountContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 24px;
    font-weight: 500;
`

const FinishWork = styled.span``;
const DeadlineWork = styled.span``;
const NonWorkingDays = styled.span``;

const MainCalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: 15px;
    row-gap: 20px;
    padding: 0 15px;
`

const CalendarCellContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    width: 54px;
`

const CalendarCell = styled.div<{ isActive: boolean }>`
    width: 54px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 20px;
    font-weight: 500;
    background-color: ${({ isActive }) => (isActive ? "#3cb371" : "transparent")};
    border-radius: 10px;
`

const CalendarDay = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 500;
`

export function SalariesPageCard() {
    const Employee = useStore((state) => state.employees)
    const Work = useStore((state) => state.works)
    const StagesWork = useStore((state) => state.stagesWork)

    // Функция для генерации дней календаря с учетом первого дня месяца
    const generateCalendar = (year: number, month: number) => {
        // Получаем день недели для первого числа месяца (0 - воскресенье, 6 - суббота)
        const firstDay = new Date(year, month, 1).getDay()

        // Преобразуем его так, чтобы неделя начиналась с понедельника (пн = 0, вс = 6)
        const correctedFirstDay = firstDay === 0 ? 6 : firstDay - 1

        // Получаем количество дней в месяце
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        // Заполняем массив с датами
        const calendar: (number | null)[] = Array(correctedFirstDay).fill(null) // Пустые ячейки до первого дня месяца
        for (let i = 1; i <= daysInMonth; i++) {
            calendar.push(i) // Добавляем каждый день месяца
        }

        return calendar
    }

    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

    const calendarDays = generateCalendar(currentYear, currentMonth)

    return (
        <SalariesPageCardStyled>
            {Employee.map((employee) => (
                <Card key={employee.id}>
                    <HeaderNameContainer>
                        <NameImageContainer>
                            <Image src={employee.imgUrl} />
                            <NameContainer>
                                <LastFirstName>
                                    <LastName>{employee.lastName}</LastName>
                                    <FirstName>{employee.firstName}</FirstName>
                                </LastFirstName>
                                <MiddleName>{employee.middleName}</MiddleName>
                            </NameContainer>
                        </NameImageContainer>
                        <WorkCountContainer>
                            <FinishWork>Выполнено работ</FinishWork>
                            <DeadlineWork>Просроченно дедлайнов</DeadlineWork>
                            <NonWorkingDays>Нерабочих дней</NonWorkingDays>
                        </WorkCountContainer>
                    </HeaderNameContainer>
                    <MainCalendarContainer>
                        {calendarDays.map((day, index) => (
                            <CalendarCellContainer key={index}>
                                <CalendarCell isActive={day !== null} key={employee.id}>
                                    
                                </CalendarCell>
                                <CalendarDay>
                                    {day || ""}
                                </CalendarDay>
                            </CalendarCellContainer>
                        ))}
                    </MainCalendarContainer>
                </Card>
            ))}
        </SalariesPageCardStyled>
    );
}
