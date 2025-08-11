import { FC } from "react"

interface IProfileProps {
    firstName: string,
    lastName: string,
    imgUrl: string,
    role: string
}

export const Profile: FC<IProfileProps> = ({ firstName, lastName, imgUrl, role }) => {
    return (
        <div className="flex justify-center gap-5">
            <div className="flex flex-col items-end gap-2">
                <span className="text-2xl font-normal text-white">{firstName} {lastName}</span>
                <span className="text-2xl font-normal text-[#C5C5C5]">{role}</span>
            </div>
            <img className="w-[70px] h-[70px] rounded-full object-cover" src={imgUrl} alt="" />
        </div>
    )
}