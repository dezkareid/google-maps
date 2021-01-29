import replace from '@rollup/plugin-replace';
import html from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import scss from 'rollup-plugin-scss';

import { GOOGLE_MAPS_KEY } from './keys'
const config = {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        scss(),
        html({
            template: 'src/index.html',
            target: 'index.html',
            replaceVars: {
                GOOGLE_MAPS_KEY,
            }
        }),
        replace({ 
            exclude: 'node_modules/**',
            GOOGLE_MAPS_KEY: JSON.stringify(GOOGLE_MAPS_KEY)
        }),
        serve('dist'),
        livereload('dist'),
    ]
}

export default config;