const express = require("express")
const router = express.Router()
const { createTask , getAllUserTasks , getProjectTasks } = require("../controllers/Task")

const { auth } = require("../middlewares/auth")

router.post("/createTask", auth, createTask)
router.get("/getAllUserTasks", auth, getAllUserTasks)
router.get("/getProjectTasks/:projectId/tasks", auth, getProjectTasks)

module.exports = router