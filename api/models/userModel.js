const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
});

//static signup method
// signup callback function  it takes two argument email and password
userSchema.statics.signup = async function (email, password, username) {
  //validatior

  if (!email || !password || !username) {
    throw Error(" All fields must be filled");
  } //  error.message

  //if not  a valid email/ strong password then validate
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(" Password not strong enough");
  }

  const exists = await this.findOne({ email, username });
  // bcrypt
  if (exists) {
    throw Error(" Email already in use");
  }

  //salt  same password will get different hash value. default 10
  const salt = await bcrypt.genSalt(12);

  //Hash the password . hash take two arguments . 1. plain password 2. salt value
  const hash = await bcrypt.hash(password, salt);

  //this  means current model schema. create newe user documetn
  const user = await this.create({
    email,
    password: hash,
    username,
  });
  return user;
};

// static sign in method

userSchema.statics.signin = async function (email, password) {
  //add username if ou want  hre
  if (!email || !password) {
    throw Error(" All fields must be filled ");
  } //  error.message

  const user = await this.findOne({ email });

  if (!user) {
    throw Error(" Incorrect email  ");
  }

  // compare tkaees 2 arg 1. plan pass 2 .bcrypt password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error(" Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
