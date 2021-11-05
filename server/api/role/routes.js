const Router = require('koa-router')
const v1 = new Router({ prefix: '/api/v1/roles' }) // 业务一级路由用复数
const Controllers = require('./controllers')
const { recordUpdateRole } = require('../../middleware/operationRecord')
v1.post('/', Controllers.createRole)
v1.get('/', Controllers.getRoles)
v1.put('/:id', recordUpdateRole, Controllers.updateRole)
v1.delete('/:id', Controllers.deleteRole)

module.exports = [v1]
