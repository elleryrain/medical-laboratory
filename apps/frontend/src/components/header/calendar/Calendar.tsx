import CalendarSvg from '@svg/Calendar.svg?react'

export function Calendar() {

    const date = new Date()
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ]
    const day = date.getDate()
    const month = months[date.getMonth()]

    return (
        <div className="flex items-center justify-center gap-5 h-[70px] border-2 border-white border-solid rounded-full pl-7 pr-1.5 pt-1.5 pb-1.5">
            <span className="text-2xl font-medium text-white">
                {day} {month}
            </span>
            <div className="flex items-center justify-center bg-[#D9D9D9] rounded-full px-2 py-2">
                <CalendarSvg className="w-[39px] h-[39px] bg-transparent"/>
            </div>
        </div>
    )
}