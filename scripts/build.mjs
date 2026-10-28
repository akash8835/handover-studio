import {build} from 'esbuild';
import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
await build({entryPoints:['src/app.js'],bundle:true,outfile:'dist/app.js',format:'esm',minify:true});
await build({entryPoints:['src/capture.js'],bundle:true,outfile:'extension/capture.js',format:'iife',minify:true});
await copyFile('node_modules/rrweb-player/dist/style.css','dist/player.css');
