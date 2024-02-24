const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Note = require("./noteModel");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user)
      return {
        error: true,
        message: "No user found",
        user: null,
      };

    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd)
      return {
        error: true,
        message: "incorrect password",
        user: null,
      };
    return {
      error: false,
      message: "",
      user,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "There was an error validating credentials",
      user: null,
    };
  }
};

userSchema.statics.signup = async function (email, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });
    return { error: false, message: "Account created!!!", user };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "There was an error creating the user",
      user: null,
    };
  }
};

module.exports = mongoose.model("user", userSchema);
