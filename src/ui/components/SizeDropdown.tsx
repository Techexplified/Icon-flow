import React, { useState, useRef, useEffect } from 'react';
import { IconSize } from '../../types';
import { Check } from 'lucide-react';

type Props = {
    selectedSize: IconSize;
    onSizeChange: (size: IconSize) => void;
};

export const SizeDropdown: React.FC<Props> = ({ selectedSize, onSizeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sizes: IconSize[] = ['Auto', 12, 16, 24, 48];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="dropdown-container" ref={containerRef}>
            <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                <span className="dropdown-value">{selectedSize}</span>
                <span className="dropdown-arrow">▼</span>
            </div>

            {isOpen && (
                <div className="size-dropdown-menu popup-menu bottom-up">
                    {sizes.map(size => (
                        <div
                            key={size}
                            className="dropdown-menu-item"
                            onClick={() => { onSizeChange(size); setIsOpen(false); }}
                        >
                            <span className="menu-item-check">
                                {selectedSize === size && <Check size={14} className="check-icon" />}
                            </span>
                            {size}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
