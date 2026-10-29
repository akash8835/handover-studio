import {build} from 'esbuild';
import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
await build({entryPoints:['src/app.js'],bundle:true,outfile:'dist/app.js',format:'esm',minify:true});
await build({entryPoints:['src/capture.js'],bundle:true,outfile:'extension/capture.js',format:'iife',minify:true});
await copyFile('node_modules/rrweb-player/dist/style.css','dist/player.css');
await build({entryPoints:['src/document-worker.mjs'],bundle:true,outfile:'dist/document-worker.js',format:'esm',minify:true});
await copyFile('node_modules/pdfjs-dist/build/pdf.worker.mjs','dist/pdf.worker.mjs');
await copyFile('node_modules/pdfjs-dist/LICENSE','dist/licenses/pdfjs-Apache-2.0.txt');
await copyFile('node_modules/mammoth/LICENSE','dist/licenses/mammoth-BSD-2-Clause.txt');

await copyFile('node_modules/pdf-lib/LICENSE.md','dist/licenses/pdf-lib-MIT.txt');
await copyFile('node_modules/docx/LICENSE','dist/licenses/docx-MIT.txt');

await build({entryPoints:['src/guide-native-export.mjs'],bundle:true,outfile:'dist/guide-native-export.js',format:'esm',minify:true});
await copyFile('node_modules/regenerator-runtime/LICENSE','dist/licenses/regenerator-MIT.txt');

await build({entryPoints:['src/dom-video.mjs'],bundle:true,outfile:'dist/dom-video-export.js',format:'esm',minify:true});

await build({entryPoints:['src/local-ocr.mjs'],bundle:true,outfile:'dist/local-ocr.js',format:'esm',minify:true});
