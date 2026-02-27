import React from 'react';
import { IconItem } from '../../types';

type IconCardProps = {
    icon: IconItem;
    isSelected: boolean;
    onSelect: (id: string, multiSelect: boolean) => void;
    color: string;
    size: number | 'Auto';
};

export const IconCard: React.FC<IconCardProps> = ({ icon, isSelected, onSelect, color, size }) => {
    const displaySize = size === 'Auto' ? 24 : size; // default to 24px for grid display preview

    return (
        <div
            className={`icon-card ${isSelected ? 'selected' : ''}`}
            onClick={(e) => onSelect(icon.id, e.ctrlKey || e.metaKey || e.shiftKey)}
            title={icon.name}
        >
            <div
                className="icon-svg-wrapper"
                style={{ color, width: displaySize, height: displaySize }}
                dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
            <span className="icon-name">{icon.name}</span>
        </div>
    );
};
