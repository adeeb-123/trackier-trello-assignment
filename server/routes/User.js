const express = require("express")
const router = express.Router()
const { login, signup , getAllUsers } = require("../controllers/Auth")

const { auth } = require("../middlewares/auth")

router.post("/login", login)
router.post("/signup", signup)
router.get("/getAllUsers", getAllUsers)

module.exports = router