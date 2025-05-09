const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    required: true,
  },
  password: { type: String, require: true },
  confirm_password: { type: String, required: true },
},
{
  versionKey: false,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
