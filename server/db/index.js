const mongoose = require("mongoose");
const Key = require("../configuration/env")();

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
};
