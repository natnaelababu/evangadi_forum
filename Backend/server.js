require("dotenv").config();
const router = require("./routes/userRoute");
const path = require("path");
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

//db connection
const dbConnection = require("./db/dbConfig");

//user routes middleware file
const userRoutes = require("./routes/userRoute");

//question routes middleware file
const questionRoutes = require("./routes/questionRoute");

//answer routes middleware file
const answerRoutes = require("./routes/answerRoute");
//authentication  middleware file
const authMiddleware = require("./middleware/authMiddleware");

//json middleware to extract json data
app.use(express.json());

app.use(cors());

//user routes middleware
app.use("/api/users", userRoutes);

//questions routes middleware
app.use("/api/questions", authMiddleware, questionRoutes);

//answers routes middleware
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
	try {
		const result = await dbConnection.execute("select 'test'");
		app.listen(port);
		console.log("database connection established");
		console.log("listening on ${port}");
		// console.log(result)
	} catch (error) {
		console.log(error.message);
	}
}
start();
