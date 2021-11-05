const Router = require('koa-router')
const v1 = new Router({ prefix: '/api/v1/operationRecords' })
const OperationRecord = require('../../db/models/operationRecord')
v1.get('/', async (ctx) => {
  const records = await OperationRecord.find().sort({ _id: -1 }).limit(10)
  ctx.body = records
})

module.exports = [v1]
