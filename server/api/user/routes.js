const Router = require('koa-router')
const v1 = new Router({ prefix: '/api/v1/users' }) // 业务一级路由用复数
const Controllers = require('./controllers')

v1.get('/roles', Controllers.getRoles)
v1.post('/', Controllers.createUser)
v1.get('/', Controllers.getUsers)
v1.put('/:id', Controllers.updateUser)
v1.patch('/:id', Controllers.resetPassword)
v1.delete('/:id', Controllers.deleteUser)
v1.post('/login', Controllers.login)
v1.get('/userInfo', Controllers.getUser)
module.exports = [v1]
