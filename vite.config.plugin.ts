import { defineConfig } from 'vite';

// Plugin-only IIFE build — Penpot requires a standalone, non-ESM script
// This config is run AFTER the main UI build so emptyOutDir: false preserves dist/
export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
            entry: 'src/plugin/plugin.ts',
            formats: ['iife'],
            name: 'IconFlowPlugin',
            fileName: () => 'plugin.js',
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});
