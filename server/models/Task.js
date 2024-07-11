const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true
        },
        tags: [
            {
                type: String,
            }
        ],
        dueDate: {
            type: Date,
        },
        assignedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);