import { create } from "zustand";

type Employee = {
  id: number;
  imgUrl: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fixedSalary: number;
};

type Work = {
  id: number;
  nameWork: string;
  date: string;
  deadline: boolean;
  employeeId: number;
};

type StagesWork = {
  id: number;
  priceStage: number;
  workId: number;
};

type Store = {
  employees: Employee[];
  works: Work[];
  stagesWork: StagesWork[];
};

const initialEmployees: Employee[] = [
  { id: 1, imgUrl: "/image/4.png", firstName: "Мария", lastName: "Дариуш", middleName: "Владимировна", fixedSalary: 20000 },
  { id: 2, imgUrl: "/image/2.png", firstName: "Сергей", lastName: "Колбин", middleName: "Александрович", fixedSalary: 15000 },
];

const initialWorks: Work[] = [
  { id: 1, nameWork: "Website Development", date: "2024-12-01", deadline: true, employeeId: 1 },
  { id: 2, nameWork: "Mobile App Design", date: "2024-12-05", deadline: false, employeeId: 2 },
];

const initialStagesWork: StagesWork[] = [
  { id: 1, priceStage: 2000, workId: 1 },
  { id: 2, priceStage: 1500, workId: 2 },
];

export const useStore = create<Store>((set) => ({
  employees: initialEmployees,
  works: initialWorks,
  stagesWork: initialStagesWork,
}));
