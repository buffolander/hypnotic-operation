import dotenv from 'dotenv'

dotenv.config()

export const getEnv = <T = unknown>(
  key: string,
  parser:
    | 'string'
    | 'string-array'
    | 'number'
    | 'number-array'
    | 'boolean'
    | 'boolean-array'
    | 'object'
    | 'object-array',
  defaultValue: T,
): T => {
  const value = process.env[key] ?? defaultValue

  switch (parser) {
    case 'string':
      return value as T
    case 'string-array':
      return typeof value === 'string' ? (value.split(/\s*,\s*/) as T) : value
    case 'number':
      return Number(value) as T
    case 'number-array':
      return typeof value === 'string' ? (value.split(/\s*,\s*/).map(Number) as T) : value
    case 'boolean':
      return (value === 'true' || value === true ? true : false) as T
    case 'boolean-array':
      return typeof value === 'string' ? (value.split(/\s*,\s*/).map((v) => v === 'true') as T) : value
    case 'object':
      return typeof value === 'string' ? (JSON.parse(value) as T) : value
    case 'object-array':
      return typeof value === 'string' ? JSON.parse(value) : value
    default:
      throw new Error('Invalid env var parser: ' + parser)
  }
}
