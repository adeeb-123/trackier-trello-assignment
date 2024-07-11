const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");


exports.createTask = async (req, res) => {
    const { taskName, description, status, tags, dueDate, assignedUser, projectId } = req.body;

    try {
        const validStatusOptions = ["Backlog", "In Discussion", "In Progress", "Done"];
        if (!validStatusOptions.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status option',
            });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        const newTask = await Task.create({
            taskName,
            description,
            status,
            tags,
            dueDate,
            assignedUser,
            projectId,
        })

        await Project.findByIdAndUpdate(
            projectId,
            { $push: { allTasks: newTask._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Task Created Successfully",
            newTask,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Task cannot be created , Try Again",
        });
    }
}

exports.getAllUserTasks = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await User.findById(userId).populate('projectsCreated').exec();
        const projectIds = user.projectsCreated.map(project => project._id);

        const tasks = await Task.find({ projectId: { $in: projectIds } }).populate('projectId')
            .populate('assignedUser')
            .exec();

        const groupedTasks = tasks.reduce((acc, task) => {
            if (!acc[task.status]) {
                acc[task.status] = [];
            }
            acc[task.status].push(task);
            return acc;
        }, {});

        return res.status(200).json({
            success: true,
            message: "All Tasks Fetched Successfully",
            groupedTasks,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Task cannot be fetched , Try Again",
        });
    }
}

exports.getProjectTasks = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const tasks = await Task.find({ projectId })
            .populate('assignedUser')
            .exec();

        const groupedTasks = tasks.reduce((acc, task) => {
            if (!acc[task.status]) {
                acc[task.status] = [];
            }
            acc[task.status].push(task);
            return acc;
        }, {});

        return res.status(200).json({
            success: true,
            message: "All Tasks Fetched Successfully",
            groupedTasks,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Tasks cannot be fetched , Try Again",
        });
    }
}