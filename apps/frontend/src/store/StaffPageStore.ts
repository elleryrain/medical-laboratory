import { create } from "zustand";
import { routes } from "../config/routes";

type CategoryStaffPage = {
    id: number,
    nameCategory: string,
    counterCategory: number,
    nameSubcategory: string,
    route: string
}

type Doctors = {
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    nameClinic: string,
    address: string,
    imgUrl: string,
    categoryId: number
}

type Techniques = {
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    imgUrl: string,
    categoryId: number
}

type TypesWork = {
    id: number,
    typesProsthetics: string,
    nameTypeWork: string,
    imgUrl: string,
    stages: TypesWorkStages[]
}

type TypesWorkStages = {
    id: number,
    nameTypeWorkStage: string,
    nameMaterial: string,
    pricePiece: number,
    namePiece?: string,
    priceMaterial: number,
    totalPrice: number,
    typeWorkId: number
}

type CategoryTechniques = {
    id: number,
    nameCategory: string,
    techniques: Techniques[]
}

export type Store = {
    categoryStaffPage: CategoryStaffPage[],
    doctors: Doctors[],
    techniques: Techniques[],
    typesWork: TypesWork[],
    typesWorkStages: TypesWorkStages[],
    categoryTechniques: CategoryTechniques[],
    addDoctor: (doctor: Doctors) => void,
    addTechnique: (technique: Techniques) => void,
    addTypeWork: (typeWork: TypesWork) => void,
    addTypeWorkStage: (typeWorkStage: TypesWorkStages) => void,
    addCategoryTechnique: (category: CategoryTechniques) => void,
    removeDoctor: (id: number) => void,
    removeTechnique: (id: number) => void,
    removeTypeWork: (id: number) => void,
    removeTypeWorkStage: (id: number) => void,
    removeCategoryTechnique: (id: number) => void,
    updateDoctor: (doctor: Doctors) => void,
    updateTechnique: (technique: Techniques) => void,
    updateTypeWork: (typeWork: TypesWork) => void,
    updateTypeWorkStage: (stage: TypesWorkStages) => void,
    updateCategoryTechnique: (category: CategoryTechniques) => void,
}

const initialCategoryStaffPage: CategoryStaffPage[] = [
    { id: 0, nameCategory: "Врачи", counterCategory: 17, nameSubcategory: "Специалисты", route: routes.doctors },
    { id: 1, nameCategory: "Техники", counterCategory: 9, nameSubcategory: "Специалисты", route: routes.techniques },
    { id: 2, nameCategory: "Виды работ", counterCategory: 36, nameSubcategory: "Наименования", route: routes.typesWork },
    { id: 3, nameCategory: "Категория техников", counterCategory: 3, nameSubcategory: "Категории", route: routes.categoryTechniques },
];

const initialDoctors: Doctors[] = [
    { id: 0, firstName: "Сергей", lastName: "Тимус", middleName: "Александрович", nameClinic: "Медгарант", address: "Екатеринбург, Казаса 15", imgUrl: "/image/2.png", categoryId: 1 },
    { id: 1, firstName: "Евгений", lastName: "Завадский", middleName: "Станиславович", nameClinic: "Медгарант", address: "Екатеринбург, Казаса 15", imgUrl: "/image/2.png", categoryId: 1 },
    { id: 2, firstName: "Сергей", lastName: "Тимус", middleName: "Александрович", nameClinic: "Медгарант", address: "Екатеринбург, Казаса 15", imgUrl: "/image/2.png", categoryId: 1 },
    { id: 3, firstName: "Евгений", lastName: "Завадский", middleName: "Станиславович", nameClinic: "Медгарант", address: "Екатеринбург, Казаса 15", imgUrl: "/image/2.png", categoryId: 1 },
    { id: 4, firstName: "Сергей", lastName: "Тимус", middleName: "Александрович", nameClinic: "Медгарант", address: "Екатеринбург, Казаса 15", imgUrl: "/image/2.png", categoryId: 1 },
    { id: 5, firstName: "Евгений", lastName: "Завадский", middleName: "Станиславович", nameClinic: "Медгарант", address: "Екатеринбург, Казаса 15", imgUrl: "/image/2.png", categoryId: 1 },
];

const initialTechniques: Techniques[] = [
    { id: 0, firstName: "Николай", lastName: "Боремский", middleName: "Владимирович", imgUrl: "/image/2.png", categoryId: 0 },
    { id: 1, firstName: "Мария", lastName: "Дарвиш", middleName: "Владимировна", imgUrl: "/image/2.png", categoryId: 0 },
    { id: 2, firstName: "Мария", lastName: "Дарвиш", middleName: "Владимировна", imgUrl: "/image/2.png", categoryId: 1 },
    { id: 3, firstName: "Мария", lastName: "Дарвиш", middleName: "Владимировна", imgUrl: "/image/2.png", categoryId: 1 },
    { id: 4, firstName: "Мария", lastName: "Дарвиш", middleName: "Владимировна", imgUrl: "/image/2.png", categoryId: 2 },
    { id: 5, firstName: "Мария", lastName: "Дарвиш", middleName: "Владимировна", imgUrl: "/image/2.png", categoryId: 2 },
    { id: 6, firstName: "Мария", lastName: "Дарвиш", middleName: "Владимировна", imgUrl: "/image/2.png", categoryId: 2 },
];

const initialTypesWork: TypesWork[] = [
    { id: 0, typesProsthetics: "Несъемное", nameTypeWork: "Металло-керамическая коронка", imgUrl: "/image/3.png", stages: [] },
    { id: 1, typesProsthetics: "Съемное", nameTypeWork: "Индивидуальная ложка под имплант", imgUrl: "/image/3.png", stages: [] },
];

const initialTypesWorkStages: TypesWorkStages[] = [
    { id: 0, nameTypeWorkStage: "Гипсовка", nameMaterial: "Циркониевый диск", pricePiece: 232, namePiece: "коронка", priceMaterial: 120, totalPrice: 780, typeWorkId: 0 },
    { id: 1, nameTypeWorkStage: "Каркас", nameMaterial: "Нет", pricePiece: 0, priceMaterial: 320, totalPrice: 1280, typeWorkId: 0 },
    { id: 2, nameTypeWorkStage: "Грунт", nameMaterial: "Нет", pricePiece: 0, priceMaterial: 80, totalPrice: 340, typeWorkId: 0 },
    { id: 3, nameTypeWorkStage: "Нанесение", nameMaterial: "Нет", pricePiece: 0, priceMaterial: 100, totalPrice: 420, typeWorkId: 0 },
    { id: 4, nameTypeWorkStage: "Гипсовка", nameMaterial: "Циркониевый диск", pricePiece: 232, namePiece: "коронка", priceMaterial: 120, totalPrice: 780, typeWorkId: 1 },
    { id: 5, nameTypeWorkStage: "Каркас", nameMaterial: "Нет", pricePiece: 0, priceMaterial: 320, totalPrice: 1280, typeWorkId: 1 },
    { id: 6, nameTypeWorkStage: "Грунт", nameMaterial: "Нет", pricePiece: 0, priceMaterial: 80, totalPrice: 340, typeWorkId: 1 },
    { id: 7, nameTypeWorkStage: "Нанесение", nameMaterial: "Нет", pricePiece: 0, priceMaterial: 100, totalPrice: 420, typeWorkId: 1 },
];

const initialCategoryTechniques: CategoryTechniques[] = [
    { id: 0, nameCategory: "1 категория", techniques: [] },
    { id: 1, nameCategory: "2 категория", techniques: [] },
    { id: 2, nameCategory: "3 категория", techniques: [] },
];

export const useStore = create<Store>((set) => ({
    categoryStaffPage: initialCategoryStaffPage,
    doctors: initialDoctors,
    techniques: initialTechniques,
    typesWork: initialTypesWork,
    typesWorkStages: initialTypesWorkStages,
    categoryTechniques: initialCategoryTechniques,

    addDoctor: (doctor) => set((state) => ({ doctors: [...state.doctors, doctor] })),
    addTechnique: (technique) => set((state) => ({ techniques: [...state.techniques, technique] })),
    addTypeWork: (typeWork) => set((state) => ({ typesWork: [...state.typesWork, typeWork] })),
    addTypeWorkStage: (stage) => set((state) => ({ typesWorkStages: [...state.typesWorkStages, stage] })),
    addCategoryTechnique: (category) => set((state) => ({ categoryTechniques: [...state.categoryTechniques, category] })),

    removeDoctor: (id) => set((state) => ({ doctors: state.doctors.filter(d => d.id !== id) })),
    removeTechnique: (id) => set((state) => ({ techniques: state.techniques.filter(t => t.id !== id) })),
    removeTypeWork: (id) => set((state) => ({ typesWork: state.typesWork.filter(w => w.id !== id) })),
    removeTypeWorkStage: (id) => set((state) => ({ typesWorkStages: state.typesWorkStages.filter(s => s.id !== id) })),
    removeCategoryTechnique: (id) => set((state) => ({ categoryTechniques: state.categoryTechniques.filter(c => c.id !== id) })),

    updateDoctor: (doctor) => set((state) => ({
        doctors: state.doctors.map(d => d.id === doctor.id ? doctor : d)
    })),
    updateTechnique: (technique) => set((state) => ({
        techniques: state.techniques.map(t => t.id === technique.id ? technique : t)
    })),
    updateTypeWork: (typeWork) => set((state) => ({
        typesWork: state.typesWork.map(w => w.id === typeWork.id ? typeWork : w)
    })),
    updateTypeWorkStage: (stage) => set((state) => ({
        typesWorkStages: state.typesWorkStages.map(s => s.id === stage.id ? stage : s)
    })),
    updateCategoryTechnique: (category) => set((state) => ({
        categoryTechniques: state.categoryTechniques.map(c => c.id === category.id ? category : c)
    })),
}));