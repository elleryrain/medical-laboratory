import { create } from "zustand";

type Employee = {
  id: number;
  techniqueId: number;
  fixedSalary: number;
};

type Penalties = {
  id: number;
  title: string;
  date: string;
  time: string;
  employeeId: number;
  amount: number;
};

export type SalaryStatus = {
  id: number;
  paymentDate: string;
  employeeId: number;
  isPaid: boolean;
};

export type SalariesStore = {
  employees: Employee[];
  penalties: Penalties[];
  salaryStatus: SalaryStatus[];
  setSalaryStatus: (status: SalaryStatus[]) => void;
  addSalaryStatus: (status: SalaryStatus) => void;
};

const initialEmployees: Employee[] = [
  { id: 0, techniqueId: 0, fixedSalary: 20000 },
  { id: 1, techniqueId: 1, fixedSalary: 15000 },
];

const initialPenalties: Penalties[] = [
  { id: 0, title: "Penalty 1", date: "01.07.2025", time: "10:00", employeeId: 0, amount: 500 },
  { id: 1, title: "Penalty 2", date: "05.07.2025", time: "14:00", employeeId: 1, amount: 750 },
];

const initialSalaryStatus: SalaryStatus[] = [
  { id: 0, paymentDate: "01.07.2025", employeeId: 0, isPaid: true },
];

export const useSalariesStore = create<SalariesStore>((set) => ({
  employees: initialEmployees,
  penalties: initialPenalties,
  salaryStatus: initialSalaryStatus,
  setSalaryStatus: (status) => set({ salaryStatus: status }),
  addSalaryStatus: (status) =>
    set((state) => ({
      salaryStatus: [...state.salaryStatus, status],
    })),
}));