
const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
    try {
        const { projectName, projectDescription } = req.body;
        const userId = req.user.id

        if (!projectName || !projectDescription) {
            return res.status(403).json({
                success: false,
                message: "Project Name and Project Description is required",
            });
        }

        const newProject = await Project.create({
            projectName,
            projectDescription,
            creator: userId
        })

        await User.findByIdAndUpdate(userId, { $push: { projectsCreated: newProject._id } }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Project Created Successfully",
            newProject,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Project Cannot be Created , Please Try Again",
        });
    }
}

exports.getAllProjects = async (req, res) => {
    const userId = req.user.id
    try {
        const allProjects = await Project.find({ creator: userId })

        return res.status(200).json({
            success: true,
            message: "All Projects Fetched",
            allProjects,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Projects Cannot be Fetched , Please Try Again",
        });
    }
}

exports.getSingleProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        if (!projectId) {
            return res.status(403).json({
                success: false,
                message: "Error while passing the Project Id",
            });
        }

        const project = await Project.findById(projectId)
            .populate('creator', 'userName email userImage')
            .exec();

        if (!project) {
            return res.status(403).json({
                success: false,
                message: "Project not found !",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project Details Fetched",
            project,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching the project",
        });
    }
}