import React from 'react';

type SearchBarProps = {
    value: string;
    onChange: (val: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search icons..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
