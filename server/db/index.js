const mongoose = require("mongoose");
const Role = require("./models/role");
const User = require("./models/user");
const Key = require("../configuration/env")();
const CryptoJS = require("crypto-js");

module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      mongoose.Promise = global.Promise;
      mongoose.connect(
        Key.databaseAddress,
        {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        },
        (err) => {
          if (err) {
            reject(
              `⚠️  :Connected failed, please check your MongoDB with ${Key.databaseAddress}`
            );
          } else {
            resolve(
              `🍟  :Successfully connected to MongoDB at ${Key.databaseAddress}`
            );
          }
        }
      );
    });
  },
  initSuperAdmin: async () => {
    let role = await Role.findOne();
    if (!role) {
      role = await Role.create({
        name: "超级管理员",
        desc: "最高权限",
        createdAt: new Date(),
      });
    }
    let user = await User.findOne();
    if (!user) {
      await User.create({
        name: "超级管理员",
        username: "admin@sccms.com",
        password: CryptoJS.HmacSHA256("123456", "sCCMS-user"),
        roles: [role._id],
        ifActive: true,
        createdAt: new Date(),
      });
    }
  },
};
