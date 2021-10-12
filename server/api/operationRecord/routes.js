const Router = require('koa-router')
const v1 = new Router({ prefix: '/api/v1/operationRecords' })
const OperationRecord = require('../../db/models/operationRecord')
v1.get('/',async(ctx)=>{
    const records = await OperationRecord.find()
    ctx.body = records
})

module.exports = [v1]