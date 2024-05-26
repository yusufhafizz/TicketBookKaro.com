const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.route("/login").post(userController.login);
router.route("/signup").post(userController.signup);
router.route("/changePassword").post(userController.changePassword);

module.exports = router;
