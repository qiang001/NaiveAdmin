const Services = require('./services')

module.exports = {
    getRoles: async (ctx) => {
        let roles = await Services.getRoles()
        ctx.body = roles
    },
    createUser:async(ctx)=>{
        const {name,username,password,roles,ifActive} = ctx.request.body
        const payload = {name,username,password,roles,ifActive}
        let newUser = await Services.createUser(payload)
        ctx.status=201
        ctx.body = newUser
    },
    getUsers:async(ctx)=>{
        let query = {
            name:{$ne:'超级管理员'}
        }
        let {page = '1',pageSize ='10',name,username,ifActive,sortRef} = ctx.query
        if(name){
            query.name={$regex:name,$options:'i'}
        }
        if(username){
            query.username={$regex:username,$options:'i'}
        }
        if(ifActive){
           query.ifActive = ifActive == 'true'
        }
        const sort = {_id:-1}
        if(sortRef){
            sort._id = sortRef == 'up' ? 1 : -1
         }
        let skip = (parseInt(page)-1)*parseInt(pageSize)
        let limit = parseInt(pageSize)
         let [total,payload] = await Services.getUsers(query,skip,limit)
         ctx.body = {
             total,
             payload
         }
    },
    updateUser:async(ctx)=>{
        let id = ctx.params.id
        const {name,username,roles,ifActive} = ctx.request.body
        const payload = {name,username,roles,ifActive}
        let res = await Services.updateUser(id,payload)
        ctx.body = res
    },
    resetPassword:async(ctx)=>{
        let id = ctx.params.id
        let {password} = ctx.request.body
        await Services.resetPassword(id,password)
        ctx.body = undefined
    },
    deleteUser:async(ctx)=>{
        let id = ctx.params.id
        await Services.deleteUser(id)
        ctx.body = undefined
    },
    login:async(ctx)=>{
        let {username,password} = {...ctx.request.body}
        let token = await Services.login(username,password)
        ctx.body = token
    },
    getUser:async(ctx)=>{
        let token = ctx.headers['authorization']
        let user = await Services.getUser(token)
        ctx.body = user
    }
}