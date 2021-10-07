const schedule = require("node-schedule");
const Role = require("../db/models/role");
const User = require("../db/models/user");
const CryptoJS = require("crypto-js");

async function SystemSetup() {
  await Role.deleteMany({});
  await User.deleteMany({});
  let adminRole = await Role.create({
    name: "超级管理员",
    desc: "最高权限",
    createdAt: new Date(),
  });
  let adminUser = await User.create({
    name: "超级管理员",
    username: "admin@sccms.com",
    password: CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256("123456", "sCCMS-user")
    ),
    roles: [adminRole._id],
    ifActive: true,
    createdAt: new Date(),
  });
  await Role.updateOne(
    { _id: adminRole._id },
    { $addToSet: { users: adminUser._id } }
  );
  const positions = ['运营','客服','配单员','送货员','仓库管理员','财务','采购','后台管理员']
  for(let roleName of positions){
      await Role.create({
          name:roleName,
          desc:roleName,
          createdAt:new Date()
      })
  }
}

module.exports = {
  setup: async () => {
    schedule.scheduleJob("0 0 0 * * *", async function () {
        await SystemSetup()
    });
    console.log("定时任务setup");
  },
};
