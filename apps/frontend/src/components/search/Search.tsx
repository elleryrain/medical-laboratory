import SearchSvg from '@img/search.svg?react';

interface SearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    className?: string;
    backgroundColor?: string;
}

export function Search({ searchQuery, setSearchQuery, className = '', backgroundColor = '#333333' }: SearchProps) {
    return (
        <div
            className={`relative flex items-center gap-5 bg-[${backgroundColor}] rounded-full pl-8 pr-7.5 w-full ${className}`}
        >
            <SearchSvg className="w-6 h-6" />
            <input
                className="border-none bg-transparent outline-none text-2xl text-[#D0D0D0] placeholder:text-[#D0D0D0] w-full"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}