const User = require('../../db/models/user')
const Role = require('../../db/models/role')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

module.exports = {
    getRoles: async () => {
        let data = await Role.aggregate([
            {
                $match: {
                    name: {
                        $ne: "超级管理员"
                    }
                }
            },
            {
                $project: {
                    name: 1
                }
            }
        ])
        return data.map(r=>{
            return {
                label:r.name,
                value:r._id
            }
        })
    },
    createUser: async (payload) => {
        let ifExist_username = await User.findOne({ username: payload.username })
        if (ifExist_username) {
            const err = new Error('用户名已被占用')
            err.code = 409
            throw err
        }
        let ifExist_name = await User.findOne({ name: payload.name })
        if (ifExist_name) {
            const err = new Error('昵称已被占用')
            err.code = 409
            throw err
        }
        payload.password = CryptoJS.HmacSHA256(payload.password, "sCCMS-user")
        let newUser = await User.create({
            ...payload,
            createdAt:new Date()
        })
        for(let role of newUser.roles){
            await Role.updateOne({ _id: role }, { $addToSet: { users: newUser._id } })
        }
        return newUser
    },
    getUsers: async ({query,skip,limit,sort}) => {
        let total = await User.countDocuments(query)
        if (total <= 0) {
            const err = new Error('员工列表为空')
            err.code = 404
            throw err
        }
        let payload = await User.find(query).sort(sort).skip(skip).limit(limit).select('-password').populate({ path: 'roles', select: 'name' })
        return [total, payload]
    },
    updateUser: async (id, payload) => {
        let ifExistName = await User.findOne({ name: payload.name, _id: { $ne: id } })
        if (ifExistName) {
            const err = new Error('名称已被占用')
            err.code = 409
            throw err
        }
        let ifExistUsername = await User.findOne({ username: payload.username, _id: { $ne: id } })
        if (ifExistUsername) {
            const err = new Error('用户名已被占用')
            err.code = 409
            throw err
        }
        let updatedUser_before = await User.findByIdAndUpdate(id, payload)
        const CHECK_OUT = async (id, roles) => {
            for(let role of roles){
                await Role.updateOne({ _id: role }, { $pull: { users: id } })
            }
        }
        const CHECK_IN = async (id, roles) => {
            for(let role of roles){
                await Role.updateOne({ _id: role }, { $addToSet: { users: id } })
            }
        }
        await CHECK_OUT(id, updatedUser_before.roles)
        await CHECK_IN(id, payload.roles)
        return await User.findById(id)
    },
    resetPassword: async (id, password) => {
        let hash = CryptoJS.HmacSHA256(password, "sCCMS-user")
        return await User.updateOne({ _id: id }, { password: hash })
    },
    deleteUser: async (id) => {
        let deletedUser_before = await User.findByIdAndDelete(id)
        const CHECK_OUT = async (id, roles) => {
            for(let role of roles){
                await Role.updateOne({ _id: role }, { $pull: { users: id } })
            }
        }
        await CHECK_OUT(id, deletedUser_before.roles)
        return 'deleted user'
    },
    login: async (username, password) => {
        let ifExist = await User.findOne({ username: username })
        if(!ifExist){
            const err = new Error('用户名不存在')
            err.code = 404
            throw err
        }
        if (!ifExist.ifActive) {
            const err = new Error('已离职，无权限登录系统')
            err.code = 401
            throw err
        }
        let hash = CryptoJS.HmacSHA256(password, "sCCMS-user")
        if (ifExist.password != hash) {
            const err = new Error('密码错误')
            err.code = 401
            throw err
        }
        return jwt.sign({
            data: {
                _id: ifExist._id,
                username: ifExist.username,
                name: ifExist.name
            }
        }, 'sCCMS-user-jwt', { expiresIn: '24h' })

    },
    getUser: async (token) => {
        try {
            let decoded = jwt.verify(token, 'sCCMS-user-jwt')
            return await User.findById(decoded.data._id).select('-password').populate('roles')
        } catch (e) {
            const err = new Error('登录状态已过期, 请重新登录')
            err.code = 403
            throw err
        }
    }
}
