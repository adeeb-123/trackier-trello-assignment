const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        projectDescription: {
            type: String,
            required: true,
        },
        allTasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ],
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);