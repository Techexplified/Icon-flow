import React from 'react';
import { IconItem } from '../../types';
import { IconCard } from './IconCard';

type IconGridProps = {
    icons: IconItem[];
    selectedIds: string[];
    onSelect: (id: string, multiSelect: boolean) => void;
    color: string;
    size: number | 'Auto';
};

export const IconGrid: React.FC<IconGridProps> = ({ icons, selectedIds, onSelect, color, size }) => {
    if (icons.length === 0) {
        return (
            <div className="empty-state">
                <p>No icons found.</p>
            </div>
        );
    }

    return (
        <div className="icon-grid">
            {icons.map((icon) => (
                <IconCard
                    key={icon.id}
                    icon={icon}
                    isSelected={selectedIds.includes(icon.id)}
                    onSelect={onSelect}
                    color={color}
                    size={size}
                />
            ))}
        </div>
    );
};
