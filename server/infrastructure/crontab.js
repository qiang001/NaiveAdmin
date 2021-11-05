const schedule = require('node-schedule')
const Role = require('../db/models/role')
const User = require('../db/models/user')
const OperationRecord = require('../db/models/operationRecord')
const CryptoJS = require('crypto-js')
const faker = require('faker')
const Services = require('../api/user/services')

async function SystemSetup() {
  await OperationRecord.deleteMany({})
  await Role.deleteMany({})
  await User.deleteMany({})
  let adminRole = await Role.create({
    name: '超级管理员',
    desc: '最高权限',
    createdAt: new Date(),
  })
  let adminUser = await User.create({
    name: '超级管理员',
    username: 'admin@sccms.com',
    password: CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256('123456', 'sCCMS-user')
    ),
    roles: [adminRole._id],
    ifActive: true,
    createdAt: new Date(),
  })
  await Role.updateOne(
    { _id: adminRole._id },
    { $addToSet: { users: adminUser._id } }
  )
  const positions = [
    '后台管理员',
    '仓库管理员',
    '配单员',
    '送货员',
    '运营',
    '客服',
    '财务',
    '采购',
  ]
  let pageAuths = [
    'Console',
    'Good',
    'GoodList',
    'GoodDetails',
    'GoodCategory',
    'Order',
    'OrderList',
    'OrderDetails',
    'Marketing',
    'Overview',
    'Plan',
    'BillionsAssistance',
    'Newcomer',
    'Customer',
    'CustomerList',
    'CustomerDetails',
    'CustomerType',
    'User',
    'UserList',
    'Authorization',
    'System',
    'OperationRecording',
    'AccessControl',
  ]
  let pageCheckedAuths = [
    'Console',
    'Good',
    'GoodList',
    'GoodDetails',
    'GoodCategory',
    'Order',
    'OrderList',
    'OrderDetails',
    'Marketing',
    'Overview',
    'Plan',
    'BillionsAssistance',
    'Newcomer',
    'Customer',
    'CustomerList',
    'CustomerDetails',
    'CustomerType',
    'User',
    'UserList',
    'Authorization',
    'System',
    'OperationRecording',
    'AccessControl',
  ]
  let contentAuths = ['Console-1', 'Console-2']
  let logicAuths = ['Console-1', 'UserList-1']
  for (let roleName of positions) {
    await Role.create({
      name: roleName,
      desc: roleName,
      pageAuths,
      pageCheckedAuths,
      contentAuths,
      logicAuths,
      createdAt: new Date(),
    })
  }
  console.log('System setup finished')
}

async function GenerateUsers() {
  const roles = await Role.find({ name: { $ne: '超级管理员' } })
  const roleIds = roles.map((r) => r._id)
  for (let i of new Array(111)) {
    try {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const rolesCount = Math.floor(Math.random() * roleIds.length + 1)
      const roles = selectRoles(roleIds, rolesCount)
      const newUser = {
        name: faker.name.findName(firstName, lastName),
        username: faker.internet.email(firstName, lastName),
        password: '123456',
        roles,
        ifActive: Math.random() >= 0.5,
      }
      await Services.createUser(newUser)
    } catch (error) {
      console.log(error)
    }
  }
  console.log('Generate users finished')
  function selectRoles(roleList, targetCount) {
    const roleIds = [...roleList]
    const selectedIds = []
    for (let i = 0; i < targetCount; i++) {
      const index = Math.floor(Math.random() * roleIds.length)
      const id = roleIds[index]
      selectedIds.push(id)
      roleIds.splice(index, 1)
    }
    return selectedIds
  }
}

module.exports = {
  setup: async () => {
    schedule.scheduleJob('0 0 * * * *', async function () {
      await SystemSetup()
      await GenerateUsers()
    })
    console.log('定时任务setup')
  },
}
