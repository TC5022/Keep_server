import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { TOKEN_SECRET } from "../config/config.js";

export const generateToken = (userId, email) =>
  jwt.sign({ userId, email }, TOKEN_SECRET, {
    algorithm: "HS512",
    expiresIn: "30d",
  });

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, saltPassword);

    try {
      const user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ message: "User already exists, Please Login." });
      } else {
        const newUser = new User({
          name,
          email,
          password: securePassword,
        });
        await newUser.save();
        res.status(201).json({
          user: newUser,
          token: generateToken(newUser._id, newUser.email),
          message: "You have successfully registered.",
          success: true
        });
      }
    } catch (err) {
      console.log(error);
      res.status(500).json({message: error, success: false});
    }
  } else {
    console.log(req.body);
    res.status(400).json({ message: "Invalid Credentials", success: false });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({
          message: "You have successfully logged in.",
          user: user,
          token: generateToken(user._id, user.email),
          success: true
        });
      } else {
        res.status(400).json({ message: "Incorrect password.", success: false });
      }
    } else {
      res.status(400).json({ message: "User does not exist.", success: false });
    }
  } catch (error) {
    res.status(500).json({message: error, success: false});
  }
};
