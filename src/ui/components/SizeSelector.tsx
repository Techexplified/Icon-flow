import React from 'react';
import { IconSize } from '../../types';

type SizeSelectorProps = {
    selectedSize: IconSize;
    onSizeChange: (size: IconSize) => void;
};

export const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
    const sizes: IconSize[] = [12, 16, 24, 48, 'Auto'];

    return (
        <div className="size-selector">
            <label className="settings-label">Size</label>
            <div className="size-options">
                {sizes.map(size => (
                    <button
                        key={size}
                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => onSizeChange(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};
