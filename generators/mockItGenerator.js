const stringGenerator = require('./stringGenerator')
const numberGenerator = require('./numberGenerator')
const integerGenerator = require('./integerGenerator')
const booleanGenerator = require('./booleanGenerator')
const randomNumber = require('./randomNumberGenerator')

const walker = (schema, schemaName, globalOverrides) => {

  globalOverrides = globalOverrides || {}

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
        const min = globalOverrides.minItems || schema.minItems || 1
        const max = globalOverrides.maxItems || schema.maxItems || 10
        const random = randomNumber(min, max)
        let arr = []
        for (let i = 0; i < random; ++i) {
          arr.push(walker(schema.items, undefined, globalOverrides))
        }
        return arr
      }
    case 'object':
      let obj = {}
      Object.keys(schema.properties || {}).forEach((key) => {
        obj[key] = walker(schema.properties[key], key, globalOverrides)
      })
      return obj
  }
}

module.exports = (schema, globalOverrides) => {
  if (Object.keys(schema).length === 0) {
    return {}
  }
  if (!schema.type) {
    throw new Error('no type found in oa schema')
  }
  return walker(schema, undefined, globalOverrides)
}
