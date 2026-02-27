import React from 'react';

type FilterPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="filter-popup-overlay" onClick={onClose}>
            <div className="filter-popup" onClick={e => e.stopPropagation()}>
                <div className="filter-section">
                    <h5>Filter Tags</h5>
                    <div className="filter-tags">
                        <button className="filter-tag active">✓ Has Stroke</button>
                        <button className="filter-tag">Precise Shapes</button>
                        <button className="filter-tag">Animated</button>
                        <button className="filter-tag active">✓ Padding</button>
                    </div>
                </div>

                <div className="filter-section">
                    <h5>Palette</h5>
                    <label className="radio-label">
                        <input type="radio" name="palette" defaultChecked />
                        <span className="custom-radio"></span> Monotone
                    </label>
                    <label className="radio-label">
                        <input type="radio" name="palette" />
                        <span className="custom-radio"></span> Multi-color
                    </label>
                </div>

                <div className="filter-section">
                    <h5>Commercial Use</h5>
                    <label className="radio-label">
                        <input type="radio" name="commercial" />
                        <span className="custom-radio"></span> Allowed
                    </label>
                    <label className="radio-label">
                        <input type="radio" name="commercial" defaultChecked />
                        <span className="custom-radio"></span> Attribution Required
                    </label>
                </div>

                <div className="filter-actions">
                    <button className="reset-btn">Reset</button>
                    <button className="apply-btn" onClick={onClose}>Apply</button>
                </div>
            </div>
        </div>
    );
};
