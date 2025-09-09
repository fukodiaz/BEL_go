import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
     server: {
        host: '0.0.0.0', //
        port: 5173,
        strictPort: true,
        hmr: {
            host: "localhost",
            port: 5173,
            protocol: "ws",
        },
        watch: {
            usePolling: true, // в Docker обязательно, иначе файлы не обновляются
        }
    },
    //  define: {
    //     __VUE_PROD_DEVTOOLS__: true,
    // },
    // build: {
    //     emptyOutDir: true,
    //     outDir: 'public/build',
    // },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'resources/assets/icons')],
            symbolId: '[name]',
        }),
    ],
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis", // фикс для пакетов, ожидающих Node.js
            },
        },
    },
});
