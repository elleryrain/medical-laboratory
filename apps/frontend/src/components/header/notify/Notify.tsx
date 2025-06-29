import NotifySvg from '@img/Notification.svg?react'

export function Notify() {

    const a = true
    
    return (
        <div className="flex items-center justify-center h-[70px] w-[70px] rounded-full bg-[#1A1A1A]">
            <div className="flex items-center justify-center bg-transparent relative cursor-pointer">
                <NotifySvg className="bg-transparent"/>
                {a && <div className='absolute h-[13px] w-[13px] bg-[#DA2525] rounded-full top-[-3px] right-0 border-2 border-[#1A1A1A]'/>}
            </div>
        </div>
    )
}