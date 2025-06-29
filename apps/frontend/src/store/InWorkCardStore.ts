import { create } from "zustand"

type CardItem = {
    id: number,
    date: string,
    numberCard: number,
    doctorId: number,
    techniqueId: number,
    typeWorkId: number,
    patient: Patient[],
    fitting: Fitting[]
}

type Patient = {
    id: number,
    numberCard: number,
    firstName: string,
    lastName: string,
    middleName: string
}

type Fitting = {
    id: number,
    numberCard: number,
    name: string,
    date: string,
    time: string
}

export type Store = {
    cards: CardItem[],
    Patient: Patient[],
    Fitting: Fitting[],
}

const initialCardItem: CardItem[] = [
    { id: 0, date: "13.05.2024", numberCard: 1, doctorId: 1, techniqueId: 1, typeWorkId: 1, patient: [], fitting: [] }
]

const initialPatient: Patient[] = [
    { id: 0, numberCard: 1, firstName: "Кирилл", lastName: "Боремский", middleName: "Николаевич" }
]

const initialFitting: Fitting[] = [
    { id: 0, numberCard: 1, name: "Примерка 1", date: "15.05.2024", time: "12:30" },
    { id: 1, numberCard: 1, name: "Примерка 2", date: "17.05.2024", time: "14:20" },
    { id: 2, numberCard: 1, name: "Дата сдачи", date: "23.05.2024", time: "10:00" }
]

export const useStore = create<Store>(() => ({
    cards: initialCardItem,
    Patient: initialPatient,
    Fitting: initialFitting,
}));