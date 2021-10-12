const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema({
  name: String,
  desc: String,
  changes: [
    {
      name: String,
      desc: String,
      diffArr: [
        { count: Number, value: String, added: Boolean, removed: Boolean },
      ],
    },
  ],
  visitorInfo: {
    _id: { type: ObjectId, ref: "User" },
    username: String,
    name: String,
  },
  createdAt: Date,
});

module.exports = mongoose.model("OperationRecord", Schema);
