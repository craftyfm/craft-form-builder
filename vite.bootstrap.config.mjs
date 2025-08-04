import { defineConfig } from 'vite';
import path from 'path';
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `` // e.g., global variables
            }
        }
    },
    build: {
        outDir: 'src/web/assets/bootstrap/dist',
        emptyOutDir: true, // Cleans the folder before building
        rollupOptions: {
            input: path.resolve(__dirname, 'src/web/assets/bootstrap/src/js/main.js'),
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
