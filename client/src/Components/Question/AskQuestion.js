import React, { useState } from "react";
import "./AskQuestion.css";
import { Link } from "react-router-dom";
import axios from "../axios";
import Container from "react-bootstrap/Container";
function AskQuestion() {
	//state to store question title from the user
	let [titleValue, setTitleValue] = useState("");
	//state to store discription from the user
	let [discriptionValue, setDiscriptionValue] = useState("");
	//state to store server response
	let [questionResponse, setQuestionResponse] = useState("");

	function submit(e) {
		e.preventDefault();
		if (!titleValue || !discriptionValue) {
			return setQuestionResponse(
				"Question title or Discrtiption can not be empty"
			);
		}
		const token = localStorage.getItem("token");
		try {
			console.log("token ", token);
			axios
				.post(
					"/questions/post-questions",
					{
						title: titleValue,
						description: discriptionValue,
					},
					{
						headers: {
							authorization: "Bearer " + token,
						},
					}
				)
				.then((response) => {
					setQuestionResponse(response.data.msg);
					e.target.reset();
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	}
	// 	let questionData = {
	// 		title: titleValue,
	// 		description: discriptionValue,
	// 	};
	// 	fetch("http://localhost:8000/api/questions/post-questions", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			authorization: "Bearer " + token,
	// 		},
	// 		body: JSON.stringify(questionData),
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setQuestionResponse(data.msg);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 		});
	// }
	return (
		// <>
		// 	<div className="askQuestion">
		// 		<h1>Steps to write a good question</h1>

		// 		<ul className="">
		// 			<li>Summerize your problem in a one-line title.</li>
		// 			<li>Describe your problem in more detail.</li>
		// 			<li>Describe what you tried and what you expected to happen.</li>
		// 			<li>Review your question and post it to the site.</li>
		// 		</ul>
		// 	</div>

		// 	<div className="askQuestion">
		// 		<br />
		// 		<br />
		// 		<br />
		// 		<br />
		// 		<h1>Ask a public question</h1>
		// 		<p>Go to Question page</p>
		// 		<br />
		// 		<h1 className="blue">{questionResponse}</h1>
		// 	</div>

		// 	<form onSubmit={submit}>
		// 		<div className="askQuestion">
		// 			<input
		// 				onChange={(e) => setTitleValue(e.target.value)}
		// 				type="text"
		// 				placeholder="Title"
		// 			/>
		// 			<br />

		// 			<textarea
		// 				onChange={(e) => setDiscriptionValue(e.target.value)}
		// 				name=""
		// 				id=""
		// 				cols="121"
		// 				rows="20"
		// 				placeholder="Question description..."
		// 			></textarea>
		// 			<br />
		// 			<button className="allQuestion-button" type="submit">
		// 				Post Your Question
		// 			</button>
		// 		</div>
		// 	</form>
		// </>
		<Container className="my-5">
			<div className="d-flex flex-column align-items-center my-5">
				<h3 className="text-center my-4 underline">
					{" "}
					Steps to write a good question
				</h3>

				<ul
					style={{
						width: "50%",
						margin: "0 auto",
						marginBottom: "60px",
						lineHeight: "30px",
					}}
				>
					<li>Summerize your problem in a one-line title.</li>
					<li>Describe your problem in more detail.</li>
					<li>Describe what you tried and what you expected to happen.</li>
					<li>Review your question and post it to the site.</li>
				</ul>
			</div>

			<div className="text-center my-2 underline textt">
				<h3>Ask a public question</h3>
				<Link
					to="/allquestion"
					className="text-decoration-none text-reset cursor-pointer"
				>
					<p>Go to Question page</p>
				</Link>

				<br />
				<h1 className="blue">{questionResponse}</h1>
			</div>

			<form onSubmit={submit} className="shadow-sm py-3 px-5">
				<div className="askQuestion">
					<input
						className="question_title"
						onChange={(e) => setTitleValue(e.target.value)}
						type="text"
						placeholder="Title"
					/>
					<br />

					<textarea
						className="question_title"
						onChange={(e) => setDiscriptionValue(e.target.value)}
						name=""
						id=""
						cols=""
						rows=""
						placeholder="Question description..."
					></textarea>
					<br />
					<button className="question_post_btn" type="submit">
						Post Your Question
					</button>
				</div>
			</form>
		</Container>
	);
}

export default AskQuestion;
