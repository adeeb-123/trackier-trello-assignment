const express = require("express")
const router = express.Router()

const { createProject, getAllProjects, getSingleProject } = require("../controllers/Projects")

const { auth } = require("../middlewares/auth")

router.post("/createProject", auth, createProject)
router.get("/getAllProjects", auth, getAllProjects)
router.get("/getSingleProject/:projectId", auth, getSingleProject)

module.exports = router