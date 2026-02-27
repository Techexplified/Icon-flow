import React, { useState, useRef, useEffect } from 'react';

type Props = {
    color: string;
    onChange: (color: string) => void;
};

export const ColorPickerDropdown: React.FC<Props> = ({ color, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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

    const presetColors = ['#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    const recentColors = ['#ffffff', '#e2e8f0', '#ef4444', '#22c55e', '#eab308', '#3b82f6', '#a855f7'];

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        if (!val.startsWith('#') && val.length > 0) val = '#' + val;
        onChange(val);
    };

    return (
        <div className="dropdown-container" ref={containerRef}>
            <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                <div className="color-swatch-mini" style={{ backgroundColor: color === 'currentColor' ? '#ffffff' : color }}></div>
                <span className="dropdown-value">{color === 'currentColor' ? '#ffffff' : color}</span>
                <span className="dropdown-arrow">▼</span>
            </div>

            {isOpen && (
                <div className="color-picker-modal popup-menu bottom-up">
                    <div className="color-picker-header">Select Color</div>
                    {/* Gradient area mock linking to native */}
                    <div className="color-gradient-area">
                        <input
                            type="color"
                            className="native-color-picker"
                            value={color === 'currentColor' ? '#ffffff' : color}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>

                    <div className="color-presets">
                        {presetColors.map(c => (
                            <div key={c} className="preset-swatch" style={{ backgroundColor: c }} onClick={() => { onChange(c); setIsOpen(false); }} />
                        ))}
                    </div>

                    <div className="color-recents">
                        <label>Recent</label>
                        <div className="color-presets recent">
                            {recentColors.map(c => (
                                <div key={c} className="preset-swatch small" style={{ backgroundColor: c }} onClick={() => { onChange(c); setIsOpen(false); }} />
                            ))}
                        </div>
                    </div>

                    <div className="hex-input-wrapper">
                        <label>HEX Code</label>
                        <input type="text" value={color === 'currentColor' ? '#ffffff' : color} onChange={handleHexChange} />
                    </div>
                </div>
            )}
        </div>
    );
};
