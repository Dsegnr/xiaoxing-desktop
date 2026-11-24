import { build } from 'esbuild'
import { mkdir, copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const root = path.dirname(fileURLToPath(import.meta.url))
await mkdir(path.join(root, 'dist'), { recursive: true })
await build({ entryPoints: [path.join(root, 'renderer.ts')], outfile: path.join(root, 'dist/renderer.js'), bundle: true, platform: 'browser', target: 'chrome140', format: 'esm' })
for (const file of ['index.html', 'pet.css']) await copyFile(path.join(root, file), path.join(root, 'dist', file))
await copyFile(path.join(root, '../frontend/public/mascot/xiaogui/idle.png'), path.join(root, 'dist/idle.png'))
