import ChangeIcon from "@svg/ChangeIcon.svg?react"

export function InWorkButton() {
    return (
        <div className="flex items-center gap-[5px] h-9 pl-[11px] pr-5.5 border-[1px solid #585858] bg-[#1C1C1C] rounded-full cursor-pointer">
            <ChangeIcon />
            <span className="text-[20px] font-medium text-white">В клинике</span>
        </div>
    )
}