import { Search } from '@/components/search/Search';
import { DropdownMenu } from '@/components/dropdownMenu/DropdownMenu';
import DeleteSvg from '@img/DeleteBold.svg?react';
import { useFilter } from '@/hooks/useFilter';

interface SearchResult {
    id: number;
    name: string;
    type: string;
    route?: string;
    imgUrl?: string;
}

interface FilterProps {
    onFilterChange: (selected: SearchResult[]) => void;
}

export function Filter({ onFilterChange }: FilterProps) {
    const {
        searchQuery,
        setSearchQuery,
        selectedPeople,
        isDropdownOpen,
        dropdownRef,
        enhancedSections,
        handleSelect,
        handleRemove,
        toggleShowAll,
    } = useFilter({
        categories: ['doctors', 'patients', 'techniques'],
        onFilterChange,
    });

    return (
        <div className="flex gap-5">
            <div className="flex gap-2.5">
                {selectedPeople.map(person => (
                    <div
                        key={`${person.type}-${person.id}`}
                        className="flex gap-2 items-center bg-[#2D2D2D] pl-5 pr-[15px] h-[49px] rounded-4xl"
                    >
                        <p className="text-2xl font-normal">
                            {person.name.split(' ').slice(0, 2).join(' ')}
                        </p>
                        <DeleteSvg
                            className="h-[23px] w-[23px] cursor-pointer"
                            onClick={() => handleRemove(person)}
                        />
                    </div>
                ))}
            </div>
            <div className="relative flex-1">
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    className="h-[49px]"
                    backgroundColor="#2D2D2D"
                />
                {isDropdownOpen && (
                    <DropdownMenu
                        ref={dropdownRef}
                        className="absolute top-full left-0 w-full max-h-[800px] overflow-y-auto z-10 mt-[10px]"
                    >
                        {enhancedSections.length > 0 ? (
                            <div>
                                {enhancedSections.map(section => (
                                    <div key={section.title} className="mb-4">
                                        <h3 className="text-2xl font-bold text-white mb-2 px-2">{section.title}</h3>
                                        <ul>
                                            {section.results
                                                .slice(0, section.showAll ? undefined : 4)
                                                .map(result => (
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
        </div>
    );
}