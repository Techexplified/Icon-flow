export type IconInfo = {
    id: string;
    name: string;
    svg: string;
};

export type IconPack = {
    id: string;
    name: string;
    license: string;
    countText: string;
    tags: string[]; // e.g. 'Material', 'UI', 'Logos'
    previewIcons: IconInfo[];
    allIcons: IconInfo[];
};

const dummySvg = (path: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${path}"></path></svg>`;
const createDummy = (name: string, path: string) => ({ id: name.toLowerCase(), name, svg: dummySvg(path) });

export const PACKS: IconPack[] = [
    {
        id: 'material',
        name: 'Material Design Icons',
        license: 'MIT',
        countText: '7,200 icons',
        tags: ['Material', 'UI'],
        previewIcons: [
            createDummy('Home', 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'),
            createDummy('User', 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'),
            createDummy('Settings', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'),
            createDummy('Heart', 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'),
            createDummy('Star', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z')
        ],
        allIcons: [
            createDummy('Home', 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'),
            createDummy('User', 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'),
            createDummy('Settings', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'),
            createDummy('Heart', 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'),
            createDummy('Star', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'),
            createDummy('Apple', 'M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z M10 2c1 .5 2 2 2 5'),
            createDummy('Laptop', 'M2 14h20v2H2zm2-8h16v6H4z'),
            createDummy('Phone', 'M5 2h14v20H5z M12 18h.01'),
            createDummy('Triangle', 'M12 2L2 22h20L12 2z'),
            createDummy('Circle', 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'),
            createDummy('Square', 'M3 3h18v18H3z'),
            createDummy('Search', 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'),
            createDummy('Arrow Down', 'M12 5v14M19 12l-7 7-7-7'),
            createDummy('Arrow Up', 'M12 19V5M5 12l7-7 7 7')
        ]
    },
    {
        id: 'lucide',
        name: 'Lucide Icons',
        license: 'ISC',
        countText: '1,200+ icons',
        tags: ['UI', 'Programming'],
        previewIcons: [
            createDummy('Zap', 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'),
            createDummy('Code', 'M16 18l6-6-6-6M8 6l-6 6 6 6'),
            createDummy('Cpu', 'M4 4h16v16H4z M9 9h6v6H9z M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3'),
            createDummy('Database', 'M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5 M21 5c0 1.66-4 3-9 3S3 6.66 3 5s4-3 9-3 9 1.34 9 3z')
        ],
        allIcons: [
            createDummy('Zap', 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'),
            createDummy('Code', 'M16 18l6-6-6-6M8 6l-6 6 6 6'),
            createDummy('Cpu', 'M4 4h16v16H4z M9 9h6v6H9z M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3'),
            createDummy('Database', 'M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5 M21 5c0 1.66-4 3-9 3S3 6.66 3 5s4-3 9-3 9 1.34 9 3z')
        ]
    },
    {
        id: 'heroicons',
        name: 'Heroicons',
        license: 'MIT',
        countText: '292 icons',
        tags: ['UI'],
        previewIcons: [
            createDummy('Bell', 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0'),
            createDummy('Mail', 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'),
            createDummy('Calendar', 'M3 4h18v16H3z M16 2v4M8 2v4M3 10h18'),
            createDummy('Camera', 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z')
        ],
        allIcons: [
            createDummy('Bell', 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0'),
            createDummy('Mail', 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'),
            createDummy('Calendar', 'M3 4h18v16H3z M16 2v4M8 2v4M3 10h18'),
            createDummy('Camera', 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z')
        ]
    }
];

export const ALL_TAGS = ['Material', 'UI', 'Logos', 'Emoji', 'Programming'];
