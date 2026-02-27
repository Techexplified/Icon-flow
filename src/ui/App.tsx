import { useState, useEffect } from 'react';
import { PACKS, ALL_TAGS } from '../data/packs';
import { InsertMessage } from '../types';
import { SearchHeader } from './components/SearchHeader';
import { PillTags } from './components/PillTags';
import { PackList } from './components/PackList';
import { PackDetail } from './components/PackDetail';
import { FilterPopup } from './components/FilterPopup';

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [activePackId, setActivePackId] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [multiSelect, setMultiSelect] = useState(false);

    // Favorites & Recents State
    const [favorites, setFavorites] = useState<any[]>([]);
    const [recents, setRecents] = useState<any[]>([]);

    // Customization State
    const [iconSize, setIconSize] = useState<any>(24);
    const [iconStroke, setIconStroke] = useState<number>(2);
    const [iconStyle, setIconStyle] = useState<'outline' | 'filled'>('outline');
    const [iconColor, setIconColor] = useState<string>('currentColor');

    // Penpot Message Listener (Theme)
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // For V1, we enforce the custom dark theme as requested by the mockup. 
            // But we still apply penpot's dataset for global hooks if necessary.
            if (event.data.type === 'theme-changed') {
                document.documentElement.dataset.theme = event.data.theme;
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Compute view state
    const activePack = activePackId === 'favorites'
        ? { id: 'favorites', name: 'Favorites', license: 'Personal', countText: `${favorites.length} icons`, tags: [], previewIcons: favorites.slice(0, 4), allIcons: favorites }
        : activePackId === 'recents'
            ? { id: 'recents', name: 'Recently Used', license: 'Personal', countText: `${recents.length} icons`, tags: [], previewIcons: recents.slice(0, 4), allIcons: recents }
            : PACKS.find(p => p.id === activePackId) || null;
    const isSearchMode = searchQuery.trim().length > 0;

    let searchResults = null;
    if (isSearchMode) {
        // Smart search with basic relevance sorting (starts with > includes)
        const query = searchQuery.toLowerCase();
        searchResults = PACKS.flatMap(p => p.allIcons)
            .filter(icon => icon.name.toLowerCase().includes(query))
            .sort((a, b) => {
                const aStarts = a.name.toLowerCase().startsWith(query) ? 1 : 0;
                const bStarts = b.name.toLowerCase().startsWith(query) ? 1 : 0;
                return bStarts - aStarts;
            });
    }

    const handleToggleTag = (tag: string) => {
        setActiveTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleInsert = (iconOrIcons: any) => {
        const iconsArray = Array.isArray(iconOrIcons) ? iconOrIcons : [iconOrIcons];

        // Add to recents
        setRecents(prev => {
            const newRecents = [...iconsArray, ...prev];
            // Deduplicate by id
            const unique = newRecents.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            return unique.slice(0, 20); // Keep max 20
        });

        const msg: InsertMessage = {
            type: 'insert-icons',
            icons: iconsArray.map(icon => ({ name: icon.name, svg: icon.svg })),
            size: iconSize,
            color: iconColor,
            stroke: iconStroke,
            style: iconStyle,
        };
        window.parent.postMessage(msg, '*');
    };

    const showPackList = !activePackId && !isSearchMode;

    return (
        <div className="app-container">
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onFilterClick={() => setIsFilterOpen(true)}
            />

            <PillTags
                allTags={ALL_TAGS}
                activeTags={activeTags}
                onToggleTag={handleToggleTag}
            />

            <div className="content-scroll">
                {showPackList && (
                    <PackList
                        packs={[
                            ...(favorites.length > 0 ? [{ id: 'favorites', name: 'Favorites', license: 'Personal', countText: `${favorites.length} icons`, tags: [], previewIcons: favorites.slice(0, 4), allIcons: favorites }] : []),
                            ...(recents.length > 0 ? [{ id: 'recents', name: 'Recently Used', license: 'Personal', countText: `${recents.length} icons`, tags: [], previewIcons: recents.slice(0, 4), allIcons: recents }] : []),
                            ...PACKS.filter(p => p.tags.some(t => activeTags.includes(t)) || activeTags.length === 0)
                        ]}
                        onSelectPack={setActivePackId}
                    />
                )}

                {(activePackId || isSearchMode) && (
                    <PackDetail
                        pack={activePack}
                        searchQuery={searchQuery}
                        searchResults={searchResults}
                        onBack={() => { setActivePackId(null); setSearchQuery(''); }}
                        onInsert={handleInsert}
                        multiSelect={multiSelect}
                        setMultiSelect={setMultiSelect}
                        iconSize={iconSize}
                        setIconSize={setIconSize}
                        iconStroke={iconStroke}
                        setIconStroke={setIconStroke}
                        iconStyle={iconStyle}
                        setIconStyle={setIconStyle}
                        iconColor={iconColor}
                        setIconColor={setIconColor}
                        favorites={favorites}
                        onToggleFavorite={(icon) => {
                            setFavorites(prev => prev.some(f => f.id === icon.id) ? prev.filter(f => f.id !== icon.id) : [...prev, icon])
                        }}
                    />
                )}
            </div>

            <FilterPopup isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
        </div>
    );
}
