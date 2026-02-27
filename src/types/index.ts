export type IconItem = {
    id: string;
    name: string;
    svg: string;
};

export type IconSize = 12 | 16 | 24 | 48 | 'Auto';

export type InsertMessage = {
    type: 'insert-icons';
    icons: { name: string; svg: string }[];
    size: IconSize;
    color: string;
    stroke?: number;
    style?: 'outline' | 'filled';
};
