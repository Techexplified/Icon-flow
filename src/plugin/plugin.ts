/// <reference types="@penpot/plugin-types" />

// No runtime imports — IIFE bundle must be fully self-contained
// All types below are TypeScript-only and erased at compile time

type IconData = {
    name: string;
    svg: string;
};

type InsertMessage = {
    type: 'insert-icons';
    icons: IconData[];
    size: number | 'Auto';
    color: string;
    stroke?: number;
    style?: 'outline' | 'filled';
};

console.log('IconFlow: plugin.js initialized!');

penpot.ui.open('IconFlow', '', {
    width: 500,
    height: 600,
});

penpot.ui.onMessage<any>((message) => {
    if (message.type === 'insert-icons') {
        const data = message as InsertMessage;
        const { icons, size, color, stroke, style } = data;

        const shapes = icons.map((icon) => {
            let modifiedSvg = icon.svg;

            // Recolor
            modifiedSvg = modifiedSvg.replace(/currentColor/g, color);

            // Apply style (Outline / Filled)
            if (style === 'filled') {
                modifiedSvg = modifiedSvg.replace(/fill="none"/g, `fill="${color}"`);
            } else if (style === 'outline') {
                modifiedSvg = modifiedSvg.replace(/fill="[^none]"/g, `fill="none"`);
            }

            // Apply stroke width
            if (stroke !== undefined) {
                modifiedSvg = modifiedSvg.replace(/stroke-width="[^"]*"/g, `stroke-width="${stroke}"`);
            }

            const shape = penpot.createShapeFromSvg(modifiedSvg);
            if (shape) {
                shape.name = icon.name;

                if (size !== 'Auto') {
                    shape.resize(size, size);
                }

                const selection = penpot.selection;
                if (selection.length > 0 && selection[0].type === 'board') {
                    const board = selection[0];
                    shape.x = board.x + (board.width / 2) - (shape.width / 2);
                    shape.y = board.y + (board.height / 2) - (shape.height / 2);
                    penpot.group([shape, board]);
                } else {
                    shape.x = penpot.viewport.center.x - (shape.width / 2);
                    shape.y = penpot.viewport.center.y - (shape.height / 2);
                }
            }
            return shape;
        }).filter(Boolean);

        if (shapes.length > 0) {
            if (shapes.length > 1) {
                const group = penpot.group(shapes as any);
                if (group) {
                    group.name = 'IconFlow Insertion';
                    penpot.selection = [group];
                }
            } else {
                penpot.selection = shapes as any;
            }
        }
    }
});

penpot.on('themechange', (theme) => {
    penpot.ui.sendMessage({
        type: 'theme-changed',
        theme,
    });
});

penpot.on('selectionchange', () => {
    penpot.ui.sendMessage({
        type: 'selection-changed',
        selection: penpot.selection.map((s) => ({ id: s.id, type: s.type, name: s.name })),
    });
});
