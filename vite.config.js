import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// docs: https://vitejs.dev/guide/build.html
export default defineConfig({
    base: '',
    root: 'site',
    publicDir: 'public',
    build: {
        outDir: './build/',
        emptyOutDir: false,
        rollupOptions: {
            input: { index: 'src/index.js' },
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
    ],
});
