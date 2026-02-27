import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Copy, Download } from 'lucide-react';
import { IconPack, IconInfo } from '../../data/packs';
import { IconSize } from '../../types';
import { SizeDropdown } from './SizeDropdown';
import { ColorPickerDropdown } from './ColorPickerDropdown';

type PackDetailProps = {
    pack: IconPack | null;
    searchQuery: string;
    searchResults: IconInfo[] | null;
    onBack: () => void;
    onInsert: (icons: IconInfo | IconInfo[]) => void;
    multiSelect: boolean;
    setMultiSelect: (val: boolean) => void;
    iconSize: IconSize;
    setIconSize: (size: IconSize) => void;
    iconStroke: number;
    setIconStroke: (stroke: number) => void;
    iconStyle: 'outline' | 'filled';
    setIconStyle: (style: 'outline' | 'filled') => void;
    iconColor: string;
    setIconColor: (color: string) => void;
    favorites?: any[];
    onToggleFavorite?: (icon: any) => void;
};

export const PackDetail: React.FC<PackDetailProps> = ({
    pack, searchQuery, searchResults, onBack, onInsert, multiSelect, setMultiSelect,
    iconSize, setIconSize, iconStroke, setIconStroke, iconStyle, setIconStyle,
    iconColor, setIconColor,
}) => {
    const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
    const isSearchMode = searchResults !== null;
    const iconsToShow = isSearchMode ? searchResults : pack?.allIcons || [];
    const subtitle = isSearchMode ? `${iconsToShow.length} results for "${searchQuery}"` : '';

    useEffect(() => {
        if (!multiSelect && selectedIcons.length === 0 && iconsToShow.length > 0) {
            setSelectedIcons([iconsToShow[0].id]);
        }
    }, [iconsToShow, multiSelect, selectedIcons]);

    const handleIconClick = (icon: IconInfo) => {
        if (multiSelect) {
            setSelectedIcons(prev =>
                prev.includes(icon.id) ? prev.filter(id => id !== icon.id) : [...prev, icon.id]
            );
        } else {
            setSelectedIcons([icon.id]);
        }
    };

    const handleImportClick = () => {
        const icons = iconsToShow.filter(i => selectedIcons.includes(i.id));
        if (icons.length > 0) {
            onInsert(icons);
            if (multiSelect) setSelectedIcons([]);
        }
    };

    const firstSelectedIcon = iconsToShow.find(i => selectedIcons.includes(i.id)) || iconsToShow[0];

    // Build the preview SVG HTML string natively applying colors/strokes for display.
    let previewHtml = firstSelectedIcon?.svg || '';
    if (previewHtml) {
        const safeColor = iconColor === 'currentColor' ? '#ffffff' : iconColor;
        previewHtml = previewHtml.replace(/currentColor/g, safeColor);
        if (iconStyle === 'filled') {
            previewHtml = previewHtml.replace(/fill="none"/g, `fill="${safeColor}"`);
        } else if (iconStyle === 'outline') {
            previewHtml = previewHtml.replace(/fill="[^none]"/g, `fill="none"`);
        }
        if (iconStroke !== undefined) {
            previewHtml = previewHtml.replace(/stroke-width="[^"]*"/g, `stroke-width="2"`);
        }
    }

    return (
        <div className="pack-detail-view" style={{ paddingBottom: '90px' }}>
            {!isSearchMode && (
                <div className="detail-header">
                    <button className="back-btn" onClick={onBack}>
                        <ArrowLeft size={16} />
                    </button>
                    <div className="detail-title-block">
                        <h2>{pack?.name}</h2>
                        <span className="pack-license">{pack?.license} License</span>
                    </div>
                    <button className="close-btn" onClick={onBack}>
                        <X size={16} />
                    </button>
                </div>
            )}

            {isSearchMode && (
                <div className="search-results-header">
                    <button className="back-link" onClick={onBack}>
                        <ArrowLeft size={14} /> Back to icon sets
                    </button>
                    <div className="results-subtitle-bar">
                        <span>{subtitle}</span>
                        <label className="multi-select-label">
                            <input
                                type="checkbox"
                                checked={multiSelect}
                                onChange={(e) => {
                                    setMultiSelect(e.target.checked);
                                    setSelectedIcons([]);
                                }}
                            />
                            Multi-select
                        </label>
                    </div>
                </div>
            )}

            <div className="detail-icon-grid" style={{ marginTop: '16px' }}>
                {iconsToShow.map(icon => (
                    <div
                        key={icon.id}
                        className={`detail-icon-card ${selectedIcons.includes(icon.id) ? 'selected' : ''}`}
                        onClick={() => handleIconClick(icon)}
                    >
                        <div className="icon-large-preview" dangerouslySetInnerHTML={{ __html: icon.svg }} />
                        <div className="icon-card-actions">
                            <button className="insert-pill-btn default" onClick={(e) => { e.stopPropagation(); onInsert(icon); }}>
                                Insert
                            </button>
                            <button className="copy-icon-btn" title="Copy SVG" onClick={(e) => { e.stopPropagation(); }}>
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button className="page-btn nav">&lt;</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span className="page-dots">...</span>
                <button className="page-btn nav">&gt;</button>
            </div>

            <div className="bottom-action-bar">
                <div className="bottom-settings">
                    <div className="setting-group">
                        <label className="settings-label">Size</label>
                        <SizeDropdown selectedSize={iconSize} onSizeChange={setIconSize} />
                    </div>
                    <div className="setting-group">
                        <label className="settings-label">Color</label>
                        <ColorPickerDropdown color={iconColor} onChange={setIconColor} />
                    </div>
                </div>

                <div className="bottom-preview-import">
                    <div className="preview-container">
                        <label className="settings-label">Preview</label>
                        <div className="preview-box" dangerouslySetInnerHTML={{ __html: previewHtml }} />
                    </div>
                    <button className="import-icon-btn" onClick={handleImportClick} disabled={selectedIcons.length === 0}>
                        <Download size={16} />
                        Import Icon
                    </button>
                </div>
            </div>
        </div>
    );
};
