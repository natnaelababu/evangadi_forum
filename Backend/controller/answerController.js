const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// Function to post an answer
const postAnswer = async (req, res) => {
	
	const questionid = req.params.questionid;
	if (!req.body || !req.body.answer || !req.params.questionid) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Missing or incomplete data in the request body." });
	}

	const { answer } = req.body;

	// Destructure the userid from the req.user object (set by the authentication middleware)
	const { userid } = req.user;

	try {
		// Check if the associated question exists
		const [question] = await dbConnection.query(
			"SELECT * FROM questions WHERE questionid = ?",
			[questionid]
		);

		if (question.length === 0) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: "Question not found" });
		}

		// Insert the new answer into the database with answer, questionId, and userid
		await dbConnection.query(
			"INSERT INTO answers (answer, questionid, userid) VALUES (?, ?, ?)",
			[answer, questionid, userid]
		);

		// Return a 201 created response if the answer is successfully inserted
		return res.status(StatusCodes.ACCEPTED).json({ msg: "Answer posted" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Something went wrong, please try again" });
	}
};

// Function to get answers for a specific question
const getAnswersForQuestion = async (req, res) => {
	if (!req.params.questionid) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Missing questionId parameter." });
	}

	const questionid = req.params.questionid;

	try {
		// Query the database to select all answers for the specified questionId
		const [answers] = await dbConnection.query(
			"SELECT * FROM answers WHERE questionid = ?",
			[questionid]
		);

		// Check if no answers were found
		if (answers.length < 1) {
			return res
				.status(StatusCodes.OK)
				.json({ msg: "No answers found for this question" });
		}

		// Return a 200 OK response with the list of answers
		return res.status(StatusCodes.OK).json({ answers });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Something went wrong, please try again" });
	}
};

module.exports = { postAnswer, getAnswersForQuestion };
