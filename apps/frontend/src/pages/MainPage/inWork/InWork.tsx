import { useState } from "react";
import { CardViewSwitcher } from "@/components/cardViewSwitcher/CardViewSwitcher";
import { Filter } from "./filter/Filter";

export function InWork() {

    const [isGridView, setIsGridView] = useState(true)

    return (
        <div className="flex gap-[40px] text-white w-full">
            <div className="flex justify-between w-full">
                <h2 className="text-[40px] font-medium">В работе</h2>
                {/* <Filter /> */}
                <CardViewSwitcher isGridView={isGridView} setIsGridView={setIsGridView}/>
            </div>
            <div>

            </div>
        </div>
    )
}