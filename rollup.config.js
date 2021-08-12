/* globals process:true */
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import analyze from 'rollup-plugin-analyzer';

const production = !process.env.ROLLUP_WATCH;

const APP_NAMES = ['index'];

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

export default APP_NAMES.map((name, index) => ({
    input: `site/src/${name}.js`,
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        dir: 'site/build/',
        indent: false,
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            compilerOptions: {
                dev: !production,
            }
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({
            output: `${name}.css`,
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('site/'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),

        analyze({ summaryOnly: true, limit: 10 }),
    ],
    watch: {
        clearScreen: false,
    },
}));