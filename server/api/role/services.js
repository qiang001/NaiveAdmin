const Role = require('../../db/models/role')

module.exports = {
    createRole: async (payload) => {
        let ifExist = await Role.findOne({ name: payload.name })
        if (ifExist) {
            const err = new Error('角色已存在')
            err.code = 409
            throw err
        }
        return await Role.create({
            ...payload,
            createdAt: new Date()
        })
    },
    getRoles: async () => {
        let roles = await Role.aggregate([
            { $addFields: { usersCount: { $size: "$users" } } },
            { $project: { users: 0 } }
        ])
        return roles
    },
    updateRole: async (id, payload) => {
        let ifExist = await Role.findOne({ name: payload.name,_id:{$ne:id} })
        if (ifExist) {
            const err = new Error('角色名称已被占用')
            err.code = 409
            throw err
        }
        return await Role.findByIdAndUpdate(id, payload, { new: true })
    },
    deleteRole: async (id) => {
        let target = await Role.findById(id)
        if(target.users.length>0){
            const err = new Error('不允许删除!')
            err.code = 403
            throw err
        }
        await Role.deleteOne({ _id: id })
        return 'delete done'
    }
}
