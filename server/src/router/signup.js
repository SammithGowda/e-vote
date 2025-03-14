const express = require("express");
const { signup, login } = require("../controler.js/userController");

const router = express.Router()

router.post("/signup",signup)
router.get("/login",login)


module.exports = router;