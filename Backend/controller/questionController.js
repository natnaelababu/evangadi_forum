const dbConnection = require("../db/dbConfig");

//Function to get all questions
const allQuestions = async (req, res) => {
	const { search } = req.headers;
	try {
		//search question
		if (search) {
			console.log("searched");
			let [searchQuestions] = await dbConnection.query(
				"SELECT * FROM questions WHERE title LIKE  concat('%' , ?, '%')",
				[search]
			);
			// console.log("serach questions",serachQuestions);
			return res.status(200).json({ searchQuestions });
		}

		// Query the database to select all questions
		let [questions] = await dbConnection.query(
			"SELECT q.questionid, q.title, u.username FROM questions q JOIN users u ON q.userid = u.userid  ORDER BY id DESC"
		);

		// Check if no questions were found
		if (questions.length < 1) {
			return res.status(404).json({ msg: "No questions found" });
		}

		// Return a 200 OK response with the list of questions
		return res.status(200).json({ questions });
	} catch (error) {
		// Log and return a 500 internal server error response if an error occurs
		console.log(error.message);
		return res
			.status(500)
			.json({ msg: "Something went wrong, please try again" });
	}
};

//Funtion that does post questions
const postQuestions = async (req, res) => {
	// Check if request body or required fields are missing
	if (!req.body || !req.body.title || !req.body.description) {
		return res
			.status(400)
			.json({ error: "Missing or incomplete data in the request body." });
	}

	// Destructure request body and extract title, description, and tag
	const { title, description, tag } = req.body;

	// Destructure the userid from the req.user object, which is set by the authentication middleware
	const { userid } = req.user;

	// Generate a unique questionid using a combination of timestamp and a random number
	const timestamp = Date.now();
	const randomId = Math.floor(Math.random() * 1000);
	const questionid = `${timestamp}-${randomId}`;

	try {
		// Check if a question with the same title and description already exists
		const [existingQuestion] = await dbConnection.query(
			"SELECT title, description FROM questions WHERE title = ? AND description = ?",
			[title, description]
		);

		// If a similar question exists, return a 409 conflict response
		if (existingQuestion.length > 0) {
			return res.status(409).json({ msg: "A similar question already exists" });
		}

		// Check if the description is not empty
		if (description.length < 1) {
			return res.status(400).json({ msg: "Description cannot be empty" });
		}

		// Insert the new question into the database with the generated questionid, title, description, userid, and tag
		await dbConnection.query(
			"INSERT INTO questions (questionid, title, description, userid, tag) VALUES (?, ?, ?, ?, ?)",
			[questionid, title, description, userid, tag]
		);

		// Return a 201 created response if the question is successfully inserted
		return res.status(201).json({ msg: "Question submitted" });
	} catch (error) {
		// Log and return a 500 internal server error response if an error occurs
		console.log(error.message);
		res.status(500).json({ msg: "Something went wrong, please try again" });
	}
};

async function singleQuestion(req, res) {
	const questionid = req.params.questionid;

	//check if the question id is provided by the user
	if (!req.params.questionid) {
		return res.status(400).json({ msg: "single question id not provided" });
	}

	try {
		//query to the database to select the question
		const [oneQuestion] = await dbConnection.query(
			"SELECT * FROM questions WHERE questionid = ?",
			[questionid]
		);

		//check if the provided question id is not in the database
		if (oneQuestion.length == 0) {
			return res
				.status(400)
				.json({ msg: "question not found with the provided id" });
		} else {
			//if the provided question id is exist on the database return the data
			console.log(oneQuestion);
			res.send({ oneQuestion });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Something went wrong, please try again" });
	}
}

module.exports = { postQuestions, allQuestions, singleQuestion };
