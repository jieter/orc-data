import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// docs: https://vitejs.dev/guide/build.html
export default defineConfig({
    base: '',
    publicDir: 'site',
    server: {
        fs: {
            allow: ['site'], // avoid access denied when serving from site/
        },
    },
    build: {
        outDir: './site/build/',
        assetsDir: '.', // Put build files in outDir
        rollupOptions: {
            input: {
                index: 'site/src/index.js',
            },
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
            },
        },
        sourcemap: true,
    },
    plugins: [
        svelte(),
        {
            name: 'redirect-root',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/') {
                        res.writeHead(302, { Location: '/site/index.html' });
                        res.end();
                    } else {
                        next();
                    }
                });
            },
        },
        {
            name: 'filter-public-dir',
            apply: 'build',
            generateBundle() {
                const skipPaths = ['src', 'data'];
                skipPaths.forEach((p) => {
                    const target = path.resolve(__dirname, 'site', p);
                    if (fs.existsSync(target)) {
                        fs.rmSync(target, { recursive: true, force: true });
                    }
                });
            },
        },
    ],
});
