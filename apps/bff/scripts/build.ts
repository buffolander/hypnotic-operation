import { spawnSync } from 'child_process'

import { BuildJs } from './build-esbuild'
import { GenerateTsoaRoutesAndSpec } from './build-tsoa'

;(async (): Promise<void> => {
  spawnSync('rimraf', ['generated/tsoa'], { stdio: 'inherit' })
  await GenerateTsoaRoutesAndSpec()
  spawnSync('rimraf', ['dist'], { stdio: 'inherit' })
  spawnSync('tsc', [], { stdio: 'inherit' })
  await BuildJs()
})()
