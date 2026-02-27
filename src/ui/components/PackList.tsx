import React from 'react';
import { IconPack } from '../../data/packs';
import { ChevronRight } from 'lucide-react';

type PackListProps = {
    packs: IconPack[];
    onSelectPack: (packId: string) => void;
};

export const PackList: React.FC<PackListProps> = ({ packs, onSelectPack }) => {
    return (
        <div className="pack-list">
            {packs.map((pack) => (
                <div key={pack.id} className="pack-card" onClick={() => onSelectPack(pack.id)}>
                    <div className="pack-card-header">
                        <div className="pack-meta">
                            <h3>{pack.name}</h3>
                            <div className="pack-subtext">
                                <span className="pack-license">{pack.license}</span>
                                <span className="pack-count">{pack.countText}</span>
                            </div>
                        </div>
                        <ChevronRight className="pack-chevron" size={18} />
                    </div>
                    <div className="pack-preview-icons">
                        {pack.previewIcons.slice(0, 5).map(icon => (
                            <div
                                key={icon.id}
                                className="pack-mini-icon"
                                dangerouslySetInnerHTML={{ __html: icon.svg }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
