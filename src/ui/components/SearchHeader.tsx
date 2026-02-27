import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

type SearchHeaderProps = {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    onFilterClick: () => void;
};

export const SearchHeader: React.FC<SearchHeaderProps> = ({ searchQuery, setSearchQuery, onFilterClick }) => {
    return (
        <div className="search-header-container">
            <h1 className="header-title">IconFlow by Explified</h1>
            <div className="search-bar">
                <Search className="search-icon" size={16} />
                <input
                    type="text"
                    placeholder="Search icons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="filter-btn" onClick={onFilterClick} title="Filters">
                    <SlidersHorizontal size={16} />
                </button>
            </div>
        </div>
    );
};
