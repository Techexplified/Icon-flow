import React from 'react';

type PillTagsProps = {
    allTags: string[];
    activeTags: string[];
    onToggleTag: (tag: string) => void;
};

export const PillTags: React.FC<PillTagsProps> = ({ allTags, activeTags, onToggleTag }) => {
    return (
        <div className="pill-tags-container">
            {allTags.map(tag => {
                const isActive = activeTags.includes(tag);
                return (
                    <button
                        key={tag}
                        className={`pill-tag ${isActive ? 'active' : ''}`}
                        onClick={() => onToggleTag(tag)}
                    >
                        {tag}
                    </button>
                );
            })}
        </div>
    );
};
