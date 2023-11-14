import React, { useContext, useEffect, useState } from "react";
import "./SingleQuestion.css";
// import { stateValue } from "../../Components/Context/context";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "../Images/profile.png";
import axios from "../axios";
import Form from "react-bootstrap/Form";
function SingleQuestion() {
	let navigate = useNavigate();
	//state to store question from server
	const [question, setQuestion] = useState({});

	//state to store answer from server
	const [answer, setAnswer] = useState([]);

	//state to store user answer
	const [userAnswer, setUserAnswer] = useState("");

	//state to store answer response from server
	const [postResponse, setPostResponse] = useState("");

	//get the url param to fetch the specific question
	const { questionid } = useParams();
	// console.log("questionid",questionid)
	const token = localStorage.getItem("token");
	useEffect(() => {
		try {
			axios
				.get("/questions/single-question/" + questionid, {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					console.log("single", response.data);

					setQuestion(response?.data?.oneQuestion[0]);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log(error);
		}
		//fetch to get single question title and description
		// fetch("http://localhost:8000/api/questions/single-question/" + questionid, {
		// 	method: "GET",
		// 	headers: {
		// 		authorization: "Bearer " + token,
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log(data)
		// 		setQuestion(data?.oneQuestion[0]);
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error:", error);
		// 	});
		try {
			axios
				.get("/answers/get-answers/" + questionid, {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					console.log("response", response);
					setAnswer(response?.data?.answers);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log(error);
		}
	}, []);
	// 	//fetch to get single question answers
	// 	fetch("http://localhost:8000/api/answers/get-answers/" + questionid, {
	// 		method: "GET",
	// 		headers: {
	// 			authorization: "Bearer " + token,
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log("data",data)

	// 			setAnswer(data?.answers);
	// 		})
	// 		.catch((error) => {
	// 			console.log("Error:", error);
	// 		});
	// }, []);

	//postanswer for single question
	function questionAnswer(e) {
		e.preventDefault();

		// 	let userAnswerData = {
		// 		answer: userAnswer,
		// 	};
		// 	//fetch to post answer for specific question
		// 	fetch("http://localhost:8000/api/answers/post-answer/" + questionid, {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			authorization: "Bearer " + token,
		// 		},
		// 		body: JSON.stringify(userAnswerData),
		// 	})
		// 		.then((data) => data.json())
		// 		.then((data) => {
		// 			console.log("data",data);
		// 			setPostResponse(data.msg)
		// 		e.target.reset()
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// }
		if (userAnswer) {
			setUserAnswer("");
			console.log("token ", token);
			axios
				.post(
					"/answers/post-answer/" + questionid,
					{
						answer: userAnswer,
					},
					{
						headers: {
							authorization: "Bearer " + token,
						},
					}
				)
				.then((response) => {
					setPostResponse(response.data.msg);
					e.target.reset();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPostResponse("answer can't be empty");
		}
	}

	return (
		<div className="mainQuestionWrapper container">
			<div>
				<h1>Question</h1>
			</div>
			<div>
				<h2>{question?.title}</h2>
			</div>
			<div className="singleQDescritpion">
				<h4>{question?.description}</h4>
			</div>
			<h1 className="community">Answer From The Community</h1>
			{answer?.map((singleAnswer) => {
				let theAnswers = (
					<div className="singleQAnswers">
						<div className="width">
							<img className="questionImage" src={img} alt="" />
							<h2>{singleAnswer.username}</h2>
						</div>
						<div>
							<h2>{singleAnswer?.answer}</h2>
						</div>
					</div>
				);
				return theAnswers;
			})}

			<div className="questionAnswer">
				<h1>Answer The Above Question</h1>

				<h2 className="blue">{postResponse}</h2>

				<form onSubmit={questionAnswer}>
					<textarea
						onChange={(e) => setUserAnswer(e.target.value)}
						name=""
						id=""
						cols="150"
						rows="5"
						placeholder="Your Answer..."
					></textarea>

					<div className="buttonWrapper">
						<button className="questionAnswer-button" type="submit">
							Post Your Answer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SingleQuestion;
