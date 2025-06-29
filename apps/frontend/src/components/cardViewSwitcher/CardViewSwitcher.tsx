import GridViewIcon from "@img/GridViewIcon.svg?react";
import ListViewIcon from "@img/ListViewIcon.svg?react";

interface ICardViewSwitcherProps {
    isGridView: boolean
    setIsGridView: (value: boolean) => void
}

export function CardViewSwitcher({ isGridView, setIsGridView }: ICardViewSwitcherProps ) {

    return (
        <div className="flex items-center bg-[#292929] rounded-[15px] h-[59px] w-fit px-1" onClick={() => setIsGridView(!isGridView)}>
            <div className={`transition duration-150 ease-linear flex items-center justify-center cursor-pointer rounded-[14px] w-[48px] h-[51px]
                ${isGridView ? 'bg-[#BDFF67]' : ''}`} >
                <GridViewIcon className={`w-[27px] h-[27px] transition duration-150 ease-linear ${isGridView ? 'fill-black' : 'fill-white'}`}/>
            </div>
            <div 
                className={`transition duration-150 ease-linear flex items-center justify-center cursor-pointer rounded-[14px] w-[48px] h-[51px]
                ${isGridView ? '' : 'bg-[#BDFF67]'}`} 
            >
                <ListViewIcon className={`w-[37px] h-[15px] transition duration-150 ease-linear ${!isGridView ? 'fill-black' : 'fill-white'}`}/>
            </div>
        </div>
    )
}