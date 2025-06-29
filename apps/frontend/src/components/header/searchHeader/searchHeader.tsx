import React from 'react';
import { useFilter } from '@/hooks/useFilter';
import { Search } from '@/components/search/Search';
import { DropdownMenu } from '@/components/dropdownMenu/DropdownMenu';

// Типы
type SearchCategory =
    | 'tasks'
    | 'doctors'
    | 'patients'
    | 'techniques'
    | 'employees'
    | 'warehouse';

interface SearchResult {
    id: number;
    name: string;
    type: string;
    route?: string;
    imgUrl?: string;
    date?: string;
    time?: string;
}

interface Section {
    title: string;
    results: SearchResult[];
    showAll: boolean;
}

export function SearchHeader() {
    const {
        searchQuery,
        setSearchQuery,
        isDropdownOpen,
        dropdownRef,
        enhancedSections,
        handleSelect,
        toggleShowAll,
    } = useFilter({
        categories: ['tasks', 'doctors', 'patients', 'techniques', 'employees', 'warehouse'],
    });

    return (
        <div className="relative flex-1">
            <Search
                className="h-[70px]"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {isDropdownOpen && (
                <DropdownMenu
                    ref={dropdownRef}
                    className="absolute top-full left-0 w-full max-h-[800px] overflow-y-auto z-10 mt-[10px]"
                >
                    {enhancedSections.length > 0 ? (
                        <div>
                            {enhancedSections.map((section) => (
                                <div key={section.title} className="mb-4">
                                    <h3 className="text-2xl font-bold text-white mb-2 px-2">{section.title}</h3>
                                    <ul>
                                        {section.results
                                            .slice(0, section.showAll ? undefined : 4)
                                            .map((result) => (
                                                <li
                                                    key={`${result.type}-${result.id}`}
                                                    className="p-2 hover:bg-gray-700 cursor-pointer flex items-center gap-3"
                                                    onClick={() => handleSelect(result)}
                                                >
                                                    {result.type === 'doctor' && (
                                                        <img
                                                            src={result.imgUrl || '/default-doctor.jpg'}
                                                            alt={result.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        {result.name}
                                                        {result.type === 'task' && result.date && result.time && (
                                                            <span className="text-sm text-gray-400 block">
                                                                {result.date} {result.time}
                                                            </span>
                                                        )}
                                                        <span className="text-sm text-gray-400"> ({result.type})</span>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                    {section.results.length > 4 && (
                                        <button
                                            className="text-[#D0D0D0] text-sm px-2 py-1 mt-2 hover:underline"
                                            onClick={() => toggleShowAll(section.title)}
                                        >
                                            {section.showAll ? 'Скрыть' : 'Показать ещё'}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-2">Ничего не найдено</div>
                    )}
                </DropdownMenu>
            )}
        </div>
    );
}