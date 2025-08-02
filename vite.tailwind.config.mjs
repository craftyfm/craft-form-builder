import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    base: '',
    plugins: [
        tailwindcss(),
    ],
    build: {
        outDir: 'src/web/assets/tailwind/dist',
        emptyOutDir: true, // Cleans the folder before building
        rollupOptions: {
            input: path.resolve(__dirname, 'src/web/assets/tailwind/src/js/main.js'),
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: (info) => {
                    if (info.name && info.name.endsWith('.css')) {
                        return 'css/[name].css';
                    }
                    return 'assets/[name]';
                },
            },
        },
    }
});
