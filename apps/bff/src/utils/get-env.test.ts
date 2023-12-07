import { getEnv } from './get-env'

let processEnv: NodeJS.ProcessEnv

describe('getEnv', () => {
  beforeAll(() => {
    processEnv = process.env
    process.env = {
      ...process.env,
      TEST_STRING: 'test',
      TEST_STRING_ARRAY: 'test1,test2,test3',
      TEST_NUMBER: '123',
      TEST_NUMBER_ARRAY: '1,2,3',
      TEST_BOOLEAN: 'true',
      TEST_BOOLEAN_ARRAY: 'true,false,true',
      TEST_OBJECT: '{"test":"test"}',
      TEST_OBJECT_ARRAY: '[{"test":"test"},{"test":"test"}]',
    }
  })

  afterAll(() => {
    process.env = processEnv
  })

  it('should return the parsed value of the env var if it exists', () => {
    expect(getEnv('TEST_STRING', 'string', 'default')).toBe('test')
    expect(getEnv('TEST_STRING_ARRAY', 'string-array', [])).toEqual(['test1', 'test2', 'test3'])
    expect(getEnv('TEST_NUMBER', 'number', 0)).toBe(123)
    expect(getEnv('TEST_NUMBER_ARRAY', 'number-array', [])).toEqual([1, 2, 3])
    expect(getEnv('TEST_BOOLEAN', 'boolean', false)).toBe(true)
    expect(getEnv('TEST_BOOLEAN_ARRAY', 'boolean-array', [])).toEqual([true, false, true])
    expect(getEnv('TEST_OBJECT', 'object', {})).toEqual({ test: 'test' })
    expect(getEnv('TEST_OBJECT_ARRAY', 'object-array', [])).toEqual([{ test: 'test' }, { test: 'test' }])
  })

  it('should return the default value if the env var is not found', () => {
    expect(getEnv('TEST_STRING_2', 'string', 'default')).toBe('default')
    expect(getEnv('TEST_STRING_ARRAY_2', 'string-array', [])).toEqual([])
    expect(getEnv('TEST_NUMBER_2', 'number', 0)).toBe(0)
    expect(getEnv('TEST_NUMBER_ARRAY_2', 'number-array', [])).toEqual([])
    expect(getEnv('TEST_BOOLEAN_2', 'boolean', false)).toBe(false)
    expect(getEnv('TEST_BOOLEAN_ARRAY_2', 'boolean-array', [])).toEqual([])
    expect(getEnv('TEST_OBJECT_2', 'object', {})).toEqual({})
    expect(getEnv('TEST_OBJECT_ARRAY_2', 'object-array', [])).toEqual([])
  })

  it('should throw if the parser is invalid', () => {
    expect(() => getEnv('TEST_STRING', 'invalid' as never, 'default')).toThrow()
  })
})
