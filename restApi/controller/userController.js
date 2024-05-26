const users = require("../models/userSchema");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await users.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json(user);
  }
  res.send();
};
exports.signup = async (req, res, next) => {
  const { username, email, name, password, dob } = req.body;
  const useravailable = await users.findOne({ email });
  if (useravailable) {
    return res.status(400).send("User already exists");
  }

  //hashing password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await users.create({
    username,
    email,
    name,
    password: hashedPassword,
    dob,
    image: "../../images/Icons/prf_img.jpg",
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).send("Error creating user");
  }
};
exports.changePassword = async (req, res, next) => {
  const { user, oldPass, newPass, confPass } = req.body;
  if (await bcrypt.compare(oldPass, user.password)) {
    if (newPass === confPass) {
      const hashedPassword = await bcrypt.hash(newPass, 10);
      const user1 = await users.findOneAndUpdate(
        { username: user.username },
        { password: hashedPassword }
      );
      return res.status(200).json(user1);
    } else {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Incorrect Password, please re-enter password." });
  }
};
