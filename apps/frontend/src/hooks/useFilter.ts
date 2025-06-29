import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFuzzySearch } from '@/hooks/useFuzzySearch';

// Типы
export interface SearchResult {
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

export type SearchCategory =
    | 'tasks'
    | 'doctors'
    | 'patients'
    | 'techniques'
    | 'employees'
    | 'warehouse';

interface UseFilterProps {
    categories: SearchCategory[];
    onFilterChange?: (selected: SearchResult[]) => void;
}

export function useFilter({ categories, onFilterChange }: UseFilterProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPeople, setSelectedPeople] = useState<SearchResult[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sectionToggles, setSectionToggles] = useState<Record<string, boolean>>({});
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Используем хук для поиска
    const sections = useFuzzySearch({
        query: searchQuery,
        categories,
    });

    // Закрытие DropdownMenu при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                if (searchQuery.trim()) {
                    setSearchQuery('');
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchQuery]);

    // Обновление видимости DropdownMenu
    useEffect(() => {
        const isQueryEmpty = !searchQuery.trim();
        if (isDropdownOpen !== !isQueryEmpty) {
            setIsDropdownOpen(!isQueryEmpty);
        }
    }, [searchQuery, isDropdownOpen]);

    // Обработка выбора элемента
    const handleSelect = useCallback(
        (result: SearchResult) => {
            if (!selectedPeople.some((person) => person.id === result.id && person.type === result.type)) {
                const newSelected = [...selectedPeople, result];
                setSelectedPeople(newSelected);
                if (onFilterChange) {
                    onFilterChange(newSelected);
                }
            }
            setSearchQuery('');
            setIsDropdownOpen(false);
        },
        [selectedPeople, onFilterChange]
    );

    // Удаление элемента из фильтра
    const handleRemove = useCallback(
        (person: SearchResult) => {
            const newSelected = selectedPeople.filter(
                (p) => !(p.id === person.id && p.type === person.type)
            );
            setSelectedPeople(newSelected);
            if (onFilterChange) {
                onFilterChange(newSelected);
            }
        },
        [selectedPeople, onFilterChange]
    );

    // Переключение "Показать ещё"
    const toggleShowAll = useCallback((sectionTitle: string) => {
        setSectionToggles((prev) => ({
            ...prev,
            [sectionTitle]: !prev[sectionTitle],
        }));
    }, []);

    // Объединяем sections с локальным showAll
    const enhancedSections = sections.map((section) => ({
        ...section,
        showAll: sectionToggles[section.title] || false,
    }));

    return {
        searchQuery,
        setSearchQuery,
        selectedPeople,
        isDropdownOpen,
        dropdownRef,
        enhancedSections,
        handleSelect,
        handleRemove,
        toggleShowAll,
        navigate,
    };
}