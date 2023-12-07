import { ExtendedRoutesConfig, ExtendedSpecConfig, generateRoutes, generateSpec } from 'tsoa'

import { getEnv } from '../src/utils/get-env'

const HOST = getEnv('HOST', 'string', 'localhost')
const PORT = getEnv('PORT', 'number', 9000)

const globalOp = {
  entryFile: 'src/main.ts',
  controllerPathGlobs: ['src/controllers/*-controller.ts'],
  basePath: '/v1',
}

const specOptions: ExtendedSpecConfig = {
  ...globalOp,
  specVersion: 3,
  host: `${HOST}:${PORT}`,
  schemes: [HOST === 'localhost' ? 'http' : 'https'],
  outputDirectory: 'generated/tsoa/spec',
  noImplicitAdditionalProperties: 'silently-remove-extras',
}

const routeOptions: ExtendedRoutesConfig = {
  ...globalOp,
  routesDir: 'generated/tsoa',
  noImplicitAdditionalProperties: 'ignore',
}

export const GenerateTsoaRoutesAndSpec = async (): Promise<void> => {
  await generateSpec(specOptions)
  console.info('Generate OpenApi Spec: Done')
  await generateRoutes(routeOptions)
  console.info('Generate Routes: Done')
}
