const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
  facebook_id: String,
  name: String,
  photo: String,
  email: String,
  password: String
});


userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = (password, userPassWord) => {
  return bcrypt.compareSync(password, userPassWord);
}


module.exports = mongoose.model('users', userSchema);