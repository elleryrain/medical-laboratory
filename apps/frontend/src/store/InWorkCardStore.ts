import { create } from "zustand";

type CardItem = {
    id: number;
    date: string;
    numberCard: number;
    doctorId: number;
    techniqueId: number;
    typeWorkId: number;
    workStatus: string;
    patientId: number;
};

type Patient = {
    id: number;
    numberCard: number;
    firstName: string;
    lastName: string;
    middleName: string;
};

type Fitting = {
    id: number;
    numberCard: number;
    name: string;
    date: string;
    time: string;
};

type Work = {
    id: number;
    nameWork: string;
    date: string;
    deadline: boolean;
    techniqueId: number;
    numberCard: number;
};

type StagesWork = {
    id: number;
    priceStage: number;
    workId: number;
};

export type InWorkCardStore = {
    cards: CardItem[];
    Patient: Patient[];
    Fitting: Fitting[];
    Works: Work[];
    StagesWork: StagesWork[];
};

const initialPatient: Patient[] = [
    { id: 0, numberCard: 1, firstName: "Кирилл", lastName: "Боремский", middleName: "Николаевич" },
];
const initialFitting: Fitting[] = [
    { id: 0, numberCard: 1, name: "Примерка 1", date: "15.05.2024", time: "12:30" },
    { id: 1, numberCard: 1, name: "Примерка 2", date: "17.05.2024", time: "14:20" },
    { id: 2, numberCard: 1, name: "Дата сдачи", date: "23.05.2024", time: "10:00" },
];

const generateWorks = () => {
    const techniques = [0, 1]; // Используем только первых двух техников (id: 0 и id: 1)
    const startDate = new Date("2025-04-30");
    const endDate = new Date("2025-08-31");
    const works: Work[] = [];
    const stagesWork: StagesWork[] = [];
    let workId = 0;
    let stageId = 0;

    const addWork = (techniqueId: number, date: Date, numberCard: number) => {
        const workTypes = ["Ацеталовый бюгельный протез", "Металло-керамическая коронка", "Индивидуальная ложка под имплант"];
        const work = {
            id: workId++,
            nameWork: workTypes[Math.floor(Math.random() * workTypes.length)],
            date: date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).split(".").reverse().join("."),
            deadline: Math.random() > 0.5,
            techniqueId,
            numberCard,
        };
        works.push(work);

        // Добавляем 1-3 стадии (максимум 3)
        const stageCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < stageCount; i++) {
            stagesWork.push({
                id: stageId++,
                priceStage: Math.floor(Math.random() * 1000) + 500, // Цена от 500 до 1500
                workId: work.id,
            });
        }
    };

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Исключаем воскресенье (0) и субботу (6)
            techniques.forEach((techniqueId) => {
                const ordersPerDay = Math.floor(Math.random() * 3) + 2; // 2-4 наряда
                for (let i = 0; i < ordersPerDay; i++) {
                    addWork(techniqueId, new Date(currentDate), techniqueId + 1); // numberCard = techniqueId + 1
                }
            });
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return { works, stagesWork };
};

const { works, stagesWork } = generateWorks();

// Генерация initialCardItem на основе works
const initialCardItem: CardItem[] = works.map((work, index) => ({
    id: index,
    date: work.date,
    numberCard: work.numberCard,
    doctorId: Math.floor(Math.random() * 6), // Случайный доктор из initialDoctors (0-5)
    techniqueId: work.techniqueId,
    typeWorkId: Math.floor(Math.random() * 3), // Случайный typeWorkId (0-2)
    workStatus: ["Не начато", "В процессе", "Завершено"][Math.floor(Math.random() * 3)], // Случайный статус
    patientId: 0, // Используем единственного пациента
}));

export const useInWorkCardStore = create<InWorkCardStore>(() => ({
    cards: initialCardItem,
    Patient: initialPatient,
    Fitting: initialFitting,
    Works: works,
    StagesWork: stagesWork,
}));