import { InWorkCardItem } from "./InWorkCardItem"

export function InWorkCard() {
    return (
        <div className="flex pt-[15px] gap-[25px] w-full overflow-x-hidden">
            <InWorkCardItem />
            <InWorkCardItem />
            <InWorkCardItem />
            <InWorkCardItem />
            <InWorkCardItem />
        </div>
    )
}