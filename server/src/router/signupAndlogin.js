const express = require("express");
const { signup, login, deleteAll } = require("../controler.js/userController");
const { authenticateToken } = require("../utils/token");

const router = express.Router()

router.post("/signup",signup)
router.get("/login",authenticateToken,login)
router.delete("/delete",deleteAll)


module.exports = router;