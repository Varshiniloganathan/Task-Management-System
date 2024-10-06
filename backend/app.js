require("dotenv").config();
const express = require("express");
const app = express();
const conn = require('./conn/conn');
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
app.use(cors());
app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);
//localhost:2000/api/v1/sign-in

app.use("/", (req, res) => {
    res.send("Hello from backend side");
});
const PORT = process.env.PORT || 2000;

const startServer = async () => {
    try {
        await conn();  // Ensure DB connection is established before starting the server
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);  // Exit process with failure
    }
};

startServer();

