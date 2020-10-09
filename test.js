const schema = {
  type: 'object',
  properties: {
    meta: {
      type: 'object',
      properties: {
        resultCount: { type: 'number' },
        offset: { type: 'number' },
        pageLimit: { type: 'number' },
      },
    },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          id: { type: 'number' },
          name: { type: 'string' },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                filters: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      key: { type: 'string' },
                      valueType: {
                        type: 'string',
                        enum: ['number', 'string', 'boolean'],
                      },
                      value: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

// console.log(require('./generators/mockItGenerator.js'));

const {walker, walker2} = require('./generators/mockItGenerator.js');

console.log('starting walker 1');;
let start = Date.now();
let res = walker(schema);
console.log(`${Date.now() - start}ms to gen ${JSON.stringify(res).length}`);

console.log('starting walker 2');
(async () => {
  start = Date.now();
  res = await walker2(schema);
  console.log(`${Date.now() - start}ms to gen ${JSON.stringify(res).length}`);
})()
