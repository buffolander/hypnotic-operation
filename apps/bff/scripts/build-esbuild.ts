import { BuildOptions, build } from 'esbuild'
import { dtsPlugin } from 'esbuild-plugin-d.ts'
import tsc from 'esbuild-plugin-tsc'

import packageJson from '../package.json'

const { dependencies = {}, peerDependencies = {} } = packageJson as typeof packageJson & {
  dependencies: Record<string, string>
  peerDependencies: Record<string, string>
}

const sharedConfig: BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: 'inline',
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies), '@tsoa/runtime'],
  plugins: [tsc({ force: true }), dtsPlugin({ outDir: 'dist' })],
}

export const BuildJs = async (): Promise<void> => {
  await build({
    ...sharedConfig,
    platform: 'node',
    outfile: 'dist/index.js',
  })
  console.info('Build CJS: Done')
  await build({
    ...sharedConfig,
    platform: 'neutral',
    format: 'esm',
    outfile: 'dist/index.esm.js',
  })
  console.info('Build ESM: Done')
}
