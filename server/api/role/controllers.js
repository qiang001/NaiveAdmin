const Services = require('./services')

module.exports = {
    createRole: async (ctx) => {
        const { name,desc,pageAuths,pageCheckedAuths,contentAuths,logicAuths} = ctx.request.body
        const payload = { name,desc,pageAuths,pageCheckedAuths,contentAuths,logicAuths }
        let res = await Services.createRole(payload)
        ctx.status=201
        ctx.body = res
    },
    getRoles:async(ctx)=>{
         let res = await Services.getRoles()
         ctx.body = res
    },
    updateRole:async(ctx)=>{
        const id = ctx.params.id
        const { name,desc,pageAuths,pageCheckedAuths,contentAuths,logicAuths} = ctx.request.body
        const payload = { name,desc,pageAuths,pageCheckedAuths,contentAuths,logicAuths }
        let res = await Services.updateRole(id,payload)
        ctx.body = res
    },
    deleteRole:async(ctx)=>{
        const id = ctx.params.id
        await Services.deleteRole(id)
        ctx.body = undefined
    }
}