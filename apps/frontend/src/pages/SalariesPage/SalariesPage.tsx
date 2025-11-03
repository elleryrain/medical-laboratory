import { Button } from "@/components/button/Button";
import { useSalariesStore } from "@/store/SalariesPageStore";
import { SalariesPageCard } from "./SalariesPageCard";
import { useStaffStore } from "@/store/StaffPageStore";
import { Modal } from "@/components/modal/Modal";
import { useModal } from "@/hooks/useModal"
import { ConfigureSalaryModal } from "./ConfigureSalaryModal";
export const SalariesPage = () => {
    const salariesStore = useSalariesStore();
    const { techniques, categoryTechniques } = useStaffStore((state) => state);
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <div className="flex flex-col text-white w-full mr-[50px] gap-10">
                <div className="flex justify-between">
                    <div className="flex gap-[30px] items-center">
                        <h1 className="text-[40px] font-medium">Зарплаты</h1>
                        <p className="text-2xl font-normal bg-[#2D2D2D] rounded-full py-2.5 px-5 cursor-pointer">
                            {new Date().toLocaleDateString("ru-RU", { month: "long" })}
                        </p>
                    </div>
                    <Button title="Настроить зарплаты" theme="addButton" onClick={() => { openModal() }} />
                </div>
                <div className="flex flex-wrap gap-7.5">
                    {salariesStore.employees.map((employee) => {
                        const technique = techniques.find((t) => t.id === employee.techniqueId);
                        const category = technique
                            ? categoryTechniques.find((c) => c.id === technique.categoryId)?.nameCategory
                            : "Не указана";
                        const employeeSalaryStatus = salariesStore.salaryStatus.filter((s) => s.employeeId === employee.id);

                        return (
                            <div key={employee.id}>
                                <SalariesPageCard
                                    imgUrl={technique?.imgUrl || "/image/default.png"}
                                    firstname={technique?.firstName || "Неизвестно"}
                                    lastname={technique?.lastName || "Неизвестно"}
                                    middlename={technique?.middleName || "Неизвестно"}
                                    category={category || "Не указана"}
                                    fixedSalary={employee.fixedSalary}
                                    bonuses={employee.fixedSalary * 0.2}
                                    penalties={salariesStore.penalties.filter((p) => p.employeeId === employee.id)}
                                    techniqueId={employee.techniqueId}
                                    salaryStatus={employeeSalaryStatus}
                                    employeeId={employee.id}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal} title="Настроить зарплаты">
                <ConfigureSalaryModal />
            </Modal>
        </>
    );
};