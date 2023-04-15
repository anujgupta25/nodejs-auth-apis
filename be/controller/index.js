const bcrypt = require("bcrypt");
const User = require("../model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      console.log(error);
      return res.send(error.array());
    }

    let errMsg = [];

    const { email, username, password, confirmPassword } = req.body;

    if (!password || !(password === confirmPassword)) {
      errMsg.push({ msg: "passwords are not matched." });
      return res.status(400).json(errMsg);
    }

    const checkExistEmail = await User.findOne({ email });

    const checkExistUsername = await User.findOne({ username });

    if (checkExistEmail || checkExistUsername) {
      errMsg.push({ msg: "Email or username already exists." });
      return res.status(400).json(errMsg);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userData = new User({
      username,
      email,
      password: hashPassword && hashPassword,
    });
    await userData.save();

    return res.status(201).json({ msg: "signup successful" });
  },
  login: async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      console.log(error);
      return res.send(error.array());
    }

    const { email, password } = req.body;
    const err = [];
    const user = await User.findOne({ email });

    if (!user) {
      err.push({ msg: "Invalid email or password" });
      return res.status(400).json(err);
    }

    const pwdHash = await bcrypt.compare(password, user.password);

    if (!pwdHash) {
      err.push({ msg: "Invalid email or password" });
      return res.status(201).json(err);
    }

    const accessToken = jwt.sign({ user: user.email }, process.env.SECRET_KEY, {
      expiresIn: "4h",
    });

    return res.status(200).json({ accessToken });
  },
  getUsers: async (req, res) => {
    const user = await User.find({}, { password: 0 });
    return res.status(200).json(user);
  }
};
