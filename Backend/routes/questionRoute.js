const express = require("express");
const router = express.Router();
const {
	postQuestions,
	allQuestions,
	singleQuestion,
} = require("../controller/questionController");

const authMiddleware = require("../middleware/authMiddleware");

//post question route
router.post("/post-questions", postQuestions);

//all questions route
router.get("/all-questions", allQuestions);


//single question route
router.get("/single-question/:questionid", singleQuestion);
module.exports = router;
