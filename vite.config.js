import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';


// docs: https://vitejs.dev/guide/build.html
export default defineConfig({
    base: '',
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
                assetFileNames: `[name].[ext]`
            }
        },
        sourcemap: true,
    },
    plugins: [
        svelte(),
    ],
});
