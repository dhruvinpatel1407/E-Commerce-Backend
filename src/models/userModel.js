//User Schema for mongoDb Database
const mongoose = require("mongoose");
// To Encrypt Password
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: [
      {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    ],
  },
  passWord: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("passWord") || this.isNew) {
    this.passWord = await bcrypt.hash(this.passWord, 10);
    // console.log('Hashed Password:', this.passWord);
  }
  next();
});

const UserCollection = mongoose.model("UserCollection", userSchema);

module.exports = UserCollection;
