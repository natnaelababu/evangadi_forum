const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
const {
	postAnswer,
	getAnswersForQuestion,
} = require("../controller/answerController");

// Route to post an answer
router.post("/post-answer/:questionid", postAnswer);

// Route to get answers for a specific question
router.get("/get-answers/:questionid", getAnswersForQuestion);

module.exports = router;
