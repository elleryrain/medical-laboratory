import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { transliterate } from 'transliteration';

import { useStaffStore } from '@/store/StaffPageStore';
import { useInWorkCardStore } from '@/store/InWorkCardStore';
import { useSalariesStore } from '@/store/SalariesPageStore';
import { useTaskStore } from '@/store/TaskScheduleStore';
import { useWarehouseStore } from '@/store/WarehousePageStore';

interface SearchResult {
    id: number;
    name: string;
    type: string;
    route?: string;
    imgUrl?: string;
    date?: string;
    time?: string;
}

export interface Section {
    title: string;
    results: SearchResult[];
    showAll: boolean;
}

type SearchCategory = 'tasks' | 'doctors' | 'patients' | 'techniques' | 'employees' | 'warehouse';

interface UseFuzzySearchProps {
    query: string;
    categories: SearchCategory[];
}

const keyboardMap: Record<string, string> = {
    ',': 'б', j: 'о', h: 'р', t: 'е', v: 'м', c: 'с', r: 'к', b: 'и', q: 'й',
    f: 'а', k: 'п', g: 'у', l: 'д', d: 'в', u: 'г', i: 'ш', o: 'щ', p: 'з',
    '[': 'х', ']': 'ъ', y: 'н', n: 'т', e: 'е', w: 'ц', a: 'ф', s: 'ы', m: 'ь',
    '.': 'ю', ';': 'ж', '\'': 'э', x: 'ч', z: 'я', '/': '.', ' ': ' ',
};

const reverseKeyboardLayout = (input: string): string => {
    return input
        .toLowerCase()
        .split('')
        .map(char => keyboardMap[char] || char)
        .join('');
};

export function useFuzzySearch({ query, categories }: UseFuzzySearchProps) {
    const [sections, setSections] = useState<Section[]>([]);

    const staffState = useStaffStore();
    const inWorkState = useInWorkCardStore();
    const salariesState = useSalariesStore();
    const taskState = useTaskStore();
    const warehouseState = useWarehouseStore();

    const searchData = useMemo(() => {
        return {
            doctors: staffState.doctors,
            techniques: staffState.techniques,
            patients: inWorkState.Patient,
            employees: salariesState.employees,
            tasks: taskState.tasks,
            items: warehouseState.items,
        };
    }, [
        staffState.doctors,
        staffState.techniques,
        inWorkState.Patient,
        salariesState.employees,
        taskState.tasks,
        warehouseState.items,
    ]);

    useEffect(() => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            setSections([]);
            return;
        }

        const queries = [
            trimmedQuery,
            transliterate(trimmedQuery),
            reverseKeyboardLayout(trimmedQuery),
        ].filter(q => q.length >= 2);

        const fuseOptions = {
            threshold: 0.3,
            keys: ['name'],
            ignoreLocation: true,
            minMatchCharLength: 2,
        };

        const resultsByCategory: Partial<Record<SearchCategory, SearchResult[]>> = {};

        const performSearch = <T extends { id: number; name: string }>(
            category: SearchCategory,
            data: T[],
            config: { type: string; route: string }
        ) => {
            if (!categories.includes(category)) return;

            const mappedData = data.map(item => ({
                ...item,
                type: config.type,
                route: config.route,
            }));

            const fuse = new Fuse(mappedData, fuseOptions);
            const results = new Set<SearchResult>();

            queries.forEach(q => {
                fuse.search(q).forEach(({ item }) => results.add(item));
            });

            resultsByCategory[category] = Array.from(results);
        };

        const taskData = useMemo(() =>
            searchData.tasks.map(t => ({
                id: t.id,
                name: t.taskName,
                type: 'task',
                route: '/tasks',
                date: t.date,
                time: t.time,
            })),
            [searchData.tasks]
        );

        const doctorData = useMemo(() =>
            searchData.doctors.map(d => ({
                id: d.id,
                name: `${d.lastName} ${d.firstName} ${d.middleName}`,
                type: 'doctor',
                route: '/doctors',
                imgUrl: d.imgUrl,
            })),
            [searchData.doctors]
        );

        const patientData = useMemo(() =>
            searchData.patients.map(p => ({
                id: p.id,
                name: `${p.lastName} ${p.firstName} ${p.middleName}`,
                type: 'patient',
                route: '/patients',
            })),
            [searchData.patients]
        );

        const techniqueData = useMemo(() =>
            searchData.techniques.map(t => ({
                id: t.id,
                name: `${t.lastName} ${t.firstName} ${t.middleName}`,
                type: 'technique',
                route: '/techniques',
            })),
            [searchData.techniques]
        );

        const employeeData = useMemo(() =>
            searchData.employees.map(e => ({
                id: e.id,
                name: `${e.lastName} ${e.firstName} ${e.middleName}`,
                type: 'employee',
                route: '/employees',
            })),
            [searchData.employees]
        );

        const warehouseData = useMemo(() =>
            searchData.items.map(i => ({
                id: i.id,
                name: i.name,
                type: 'warehouse',
                route: '/warehouse',
            })),
            [searchData.items]
        );

        performSearch('tasks', taskData, { type: 'task', route: '/tasks' });
        performSearch('doctors', doctorData, { type: 'doctor', route: '/doctors' });
        performSearch('patients', patientData, { type: 'patient', route: '/patients' });
        performSearch('techniques', techniqueData, { type: 'technique', route: '/techniques' });
        performSearch('employees', employeeData, { type: 'employee', route: '/employees' });
        performSearch('warehouse', warehouseData, { type: 'warehouse', route: '/warehouse' });

        const sectionMap: Record<SearchCategory, string> = {
            tasks: 'Задачи',
            doctors: 'Врачи',
            patients: 'Пациенты',
            techniques: 'Техники',
            employees: 'Сотрудники',
            warehouse: 'Склад',
        };

        setSections(
            categories
                .map(category => ({
                    title: sectionMap[category],
                    results: resultsByCategory[category] || [],
                    showAll: false,
                }))
                .filter(section => section.results.length > 0)
        );
    }, [query, categories, searchData]);

    return sections;
}