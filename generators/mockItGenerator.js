import { stringGenerator } from './stringGenerator'
import { numberGenerator } from './numberGenerator'
import { integerGenerator } from './integerGenerator'
import { booleanGenerator } from './booleanGenerator'
import { randomNumber } from './numberGenerator'

const walker = (schema, schemaName) => {
  if (!schema.type && schema.properties) {
    schema.type = 'object'
  }
  if (schema.example) {
    return schema.example
  }
  switch (schema.type) {
    case 'string':
      return stringGenerator(schema, schemaName)
    case 'number':
      return numberGenerator(schema, schemaName)
    case 'integer':
      return integerGenerator(schema, schemaName)
    case 'boolean':
      return booleanGenerator(schema)
    case 'array':
      if (!schema.items) {
        return []
      } else {
        const min = schema.minItems || 1
        const max = schema.minItems || 10
        const random = randomNumber(min, max)
        let arr = []
        for (let i = 0; i < random; ++i) {
          arr.push(walker(schema.items))
        }
        return arr
      }
    case 'object':
      let obj = {}
      Object.keys(schema.properties).forEach((key) => {
        obj[key] = walker(schema.properties[key], key)
      })
      return obj
  }
}

export const mockItGenerator = (schema) => {
  if (Object.keys(schema).length === 0) {
    return {}
  }
  if (!schema.type) {
    throw new Error('no type found in oa schema')
  }
  return walker(schema)
}
