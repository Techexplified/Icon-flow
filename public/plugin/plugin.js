penpot.ui.open('IconFlow', `?theme=${penpot.theme}`, {
    width: 500,
    height: 600,
});
penpot.ui.onMessage((message) => {
    if (message.type === 'insert-icons') {
        const data = message;
        const { icons, size, color } = data;
        const shapes = icons.map((icon) => {
            // Basic recoloring by replacing currentColor or full hex matches
            // A more robust way involves traversing the SVG DOM, but String replace is sufficient for V1 dummy icons
            let modifiedSvg = icon.svg.replace(/currentColor/g, color);
            const shape = penpot.createShapeFromSvg(modifiedSvg);
            if (shape) {
                shape.name = icon.name;
                // Handle resizing
                if (size !== 'Auto') {
                    // Maintaining aspect ratio based on original viewBox/size
                    shape.resize(size, size);
                }
                // Handle insertion placement
                const selection = penpot.selection;
                if (selection.length > 0 && selection[0].type === 'board') {
                    // Insert into selected frame/board
                    const board = selection[0];
                    shape.x = board.x + (board.width / 2) - (shape.width / 2);
                    shape.y = board.y + (board.height / 2) - (shape.height / 2);
                    // Workaround for penpot board appending (SDK requires group/board manipulation)
                    // As of Penpot plugin API: 'board.appendChild is not consistently available depending on version'
                    penpot.group([shape, board]);
                }
                else {
                    // Insert at viewport center
                    shape.x = penpot.viewport.center.x - (shape.width / 2);
                    shape.y = penpot.viewport.center.y - (shape.height / 2);
                }
            }
            return shape;
        }).filter(Boolean);
        if (shapes.length > 0) {
            // Group them if multiple are inserted at once so they are easy to move
            if (shapes.length > 1) {
                const group = penpot.group(shapes);
                if (group) {
                    group.name = 'IconFlow Insertion';
                    penpot.selection = [group];
                }
            }
            else {
                penpot.selection = shapes;
            }
        }
    }
});
// Watch for selection changes and notify the UI
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
export {};
