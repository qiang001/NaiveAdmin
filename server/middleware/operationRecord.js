const Role = require('../db/models/role')
const OperationRecord = require('../db/models/operationRecord')
const jsDiff = require('diff')
module.exports = {
  recordUpdateRole: async (ctx, next) => {
    let id = ctx.params.id
    const before = await Role.findById(id).lean()
    await next()
    const after = await Role.findById(id).lean()
    const diffArr = jsDiff.diffJson(before, after)
    await OperationRecord.create({
      name: '更新角色信息',
      desc: 'recordUpdateRole',
      changes: [
        {
          name: 'Role',
          desc: id,
          diffArr,
        },
      ],
      visitorInfo: ctx.visitorInfo,
      createdAt: new Date(),
    })
  },
}
