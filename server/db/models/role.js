const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema({
  name: String,
  desc: String,
  pageAuths: [String],
  pageCheckedAuths:[String],
  contentAuths: [String],
  logicAuths: [String],
  users: [{ type: ObjectId, ref: "User" }],
  createdAt: Date,
});

module.exports = mongoose.model("Role", Schema);
