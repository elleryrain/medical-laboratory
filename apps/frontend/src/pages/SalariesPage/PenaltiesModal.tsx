import { Button } from "@/components/button/Button";
import { CustomInput } from "@/components/input/CustomInput";
import { Penalties, useSalariesStore } from "@/store/SalariesPageStore";
import { useEffect, useState } from "react";
import DeleteRedCircle from "@svg/deleteRedCircle.svg?react";
import Plus from "@svg/plus.svg?react";

interface IPenaltiesModalProps {
    penalties: Penalties[];
    employeeId: number;
    onSave: (penalties: Penalties[]) => void;
}

export const PenaltiesModal = ({ penalties, employeeId, onSave }: IPenaltiesModalProps) => {
    const [penaltiesState, setPenaltiesState] = useState<Penalties[]>([]);
    const [isAddPenalty, setIsAddPenalty] = useState(false);

    // Синхронизация с пропсами
    useEffect(() => {
        setPenaltiesState(penalties);
    }, [penalties]);

    // Обработчик изменения поля штрафа
    const handlePenaltyChange = (id: number, field: keyof Penalties, value: string | number) => {
        setPenaltiesState((prev) =>
            prev.map((penalty) =>
                penalty.id === id ? { ...penalty, [field]: value } : penalty
            )
        );
    };

    // Добавление нового штрафа
    const addNewPenalty = () => {
        const newPenalty: Penalties = {
            id: Date.now(),
            title: "Новый штраф",
            date: new Date().toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }),
            time: new Date().toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit"
            }),
            employeeId,
            amount: 0
        };
        setPenaltiesState((prev) => [...prev, newPenalty]);
    };

    // Удаление штрафа
    const deletePenalty = (id: number) => {
        setPenaltiesState((prev) => prev.filter((penalty) => penalty.id !== id));
    };

    return (
        <div className="">
            {penalties.length > 0 || isAddPenalty ? (
                <div className="flex flex-col gap-[50px] mt-10">
                    {penaltiesState.map((penalty) => (
                        <div key={penalty.id} className="flex flex-col gap-[50px]">
                            <div className="flex gap-5">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-5 w-full">
                                        <CustomInput
                                            value={penalty.title}
                                            onChange={(e) => handlePenaltyChange(penalty.id, "title", e.target.value)}
                                            placeholder="Причина штрафа"
                                        />
                                        <CustomInput
                                            type="currency"
                                            value={penalty.amount}
                                            onChange={(e) => handlePenaltyChange(penalty.id, "amount", Number(e.target.value))}
                                        />
                                        <div className="flex w-[301px] gap-[15px]">
                                            <CustomInput
                                                type="date"
                                                value={penalty.date}
                                                onChange={(e) => handlePenaltyChange(penalty.id, "date", e.target.value)}
                                            />
                                            <CustomInput
                                                type="time"
                                                value={penalty.time}
                                                onChange={(e) => handlePenaltyChange(penalty.id, "time", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DeleteRedCircle
                                    className="my-4 cursor-pointer"
                                    onClick={() => deletePenalty(penalty.id)}
                                />
                            </div>
                            <div className="border-[#535353] border-solid border-t-[1px]"></div>
                        </div>
                    ))}
                    <Button onClick={addNewPenalty} theme="lineButton" title="Еще штраф" className="h-[71px] w-full rounded-[15px]" />

                    <Button
                        title="Сохранить"
                        theme="salaryNotPaid"
                        onClick={() => onSave(penaltiesState)}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center mt-[70px] gap-5">
                    <img src="/public/image/NoPenalty.png" alt="No Penalties" className="h-[275px] w-[276px]" />
                    <div className="flex flex-col items-center gap-7.5">
                        <div className="flex flex-col items-center text-center gap-2.5">
                            <h1 className="text-[40px] font-medium">Штрафов пока нет</h1>
                            <p className="text-xl max-w-[280px] font-normal text-[#CACACA]">
                                Но вы можете выписать их по кнопке ниже
                            </p>
                        </div>
                        <Button title="Выписать штраф" theme="salaryNotPaid" onClick={() => setIsAddPenalty(true)} />
                    </div>
                </div>
            )}
        </div>
    );
};