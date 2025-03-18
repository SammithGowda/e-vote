const express = require("express");
const { profile, profilePassChange } = require("../controler.js/profileController");

const router = express.Router()

router.get("/get",profile)
router.put("/credentialChange",profilePassChange)

module.exports = router;