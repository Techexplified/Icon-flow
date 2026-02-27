import React from 'react';

type ColorPickerProps = {
    color: string;
    onColorChange: (color: string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
    return (
        <div className="color-picker-container">
            <label className="settings-label">Color</label>
            <div className="color-picker-input-wrapper">
                <input
                    type="color"
                    value={color}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="color-input"
                />
                <input
                    type="text"
                    value={color.toUpperCase()}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="color-hex-input"
                />
            </div>
        </div>
    );
};
