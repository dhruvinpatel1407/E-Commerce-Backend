const UserCollection = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/auth");
const chalk = require("chalk");


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID
 *         userName:
 *           type: string
 *           description: Username
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         passWord:
 *           type: string
 *           description: User password (hashed)
 *       required:
 *         - userName
 *         - email
 *         - passWord
 */

const register = async (req, res) => {
  try {
    const { userName, email, passWord } = req.body;

    // Check if username or email already exists
    const existingUser = await UserCollection.findOne({
      $or: [{ userName }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.userName === userName
            ? "Username already exists"
            : existingUser.email === email
            ? "Email already exists"
            : "Registration failed",
      });
    }
    const newUser = new UserCollection({ userName, email, passWord });
    const savedUser = await newUser.save();
    const token = generateToken(savedUser);
    res.header("x-auth-token", token);
    res.status(201).json({ user: savedUser, token: token });
  } catch (err) {
    console.error(chalk.red.bold("Error in registration: "), err);
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { emailOrUsername, passWord } = req.body; // Use this instead of separate userName and email

    // Find user by username or email
    const user = await UserCollection.findOne({
      $or: [{ userName: emailOrUsername }, { email: emailOrUsername }],
    });
    if (!user) {
      return res.status(404).json({ error: "Username/Email not found" });
    }
    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken(user);
    res.header("x-auth-token", token);
    res.status(200).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    console.error(chalk.red.bold("Error in login: "), err);
    res.status(500).json({ error: "Login failed" });
  }
};

const getMe = async (req, res) => {
  try {
    // Get the user ID from the token (req.user._id is provided by verifyToken middleware)
    const userId = req.user.userId;
    // Find the user by ID and exclude password
    const user = await UserCollection.findById(userId).select("-passWord");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(chalk.red.bold("Error in getting user: "), err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const Id = req.params.id;
    const user = await UserCollection.findById(Id);
    if (user) {
      await user.deleteOne();
    }
    if (!user) {
      res.status(404).json({ error: "User not exists" });
    }
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "record not exists" });
  }
};

const updateUser = async (req, res) => {
  try {
    const Id = req.params.id;
    const updatedData = req.body;

    // Find the user first
    const user = await UserCollection.findById(Id);
    if (!user) {
      return res.status(404).json({ error: "User not exists" });
    }

    // Update user fields manually
    Object.keys(updatedData).forEach((key) => {
      user[key] = updatedData[key];
    });

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated Successfully", user });
  } catch (err) {
    console.error(chalk.red.bold("Error in updating user: "), err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  getMe,
  deleteUser,
  updateUser,
};
