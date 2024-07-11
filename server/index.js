const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const projectRoutes = require("./routes/Project");
const taskRoutes = require("./routes/Task");

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/task", taskRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and Running...."
    });
});

app.listen(PORT, () => {
    console.log(`APP is Runnung at ${PORT}`)
}); 