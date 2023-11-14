import React, { useEffect, useState, useContext } from "react";
import "./AllQuestions.css";
import { stateValue } from "../Context/context";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../Images/profile.png";

function AllQuestions() {
	let { username, setusername } = useContext(stateValue);
	let navigate = useNavigate();
	
	//get token from local storage
	const token = localStorage.getItem("token");

	//state to store the questions from the server
	let [question, setQuestion] = useState([]);

	useEffect(() => {
		try {
			axios
				.get("/questions/all-questions", {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					// console.log("data",response.data)
					setQuestion(response?.data.questions);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log(error);
		}
	}, []);
	// 	fetch(url, {
	// 		method: "GET",
	// 		headers: {
	// 			authorization: "Bearer " + token,
	// 		},
	// 	})
	// 		.then((response) => response.json())

	// 		.then((data) => {
	// 			console.log("data", data);
	// 			setQuestion(data);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 		});
	// }, []);

	// if (question) {
	// 	lastQuestions = question.questions;
	// }

	function click(singleQ) {
		// console.log(singleQ?.questionid);
		navigate = navigate("/single-question/" + singleQ?.questionid);
	}

	function search(e) {
		try {
			axios
				.get("/questions/all-questions", {
					headers: {
						authorization: "Bearer " + token,
						search: e.target.value,
					},
				})
				.then((response) => {
					if (response.data.searchQuestions)
						setQuestion(response.data.searchQuestions);
					else setQuestion(response.data.questions);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="main container">
			<div className="flexWrapper upperwelcome row justify-content-between">
				<button
					className="Abutton col-12 col-sm-3"
					onClick={() => navigate("/askQuestion")}
				>
					Ask Question
				</button>
				<input
					type="text"
					placeholder="Search Questions"
					className="Ainput col-12 col-sm-3"
					onChange={search}
				/>
				<h4 className="col-12 col-sm-3">Welcome: {username}</h4>
			</div>

			<div className="allQuestions">
				<h2>Questions</h2>
				{question?.map((singleQuestion) => {
					let theQuestion = (
						<div className="questions" onClick={() => click(singleQuestion)}>
							<div className="width">
								<img className="questionImage" src={img} alt="" />
								<p>{singleQuestion?.username}</p>
							</div>

							<h4>{singleQuestion?.title}</h4>
						</div>
						
					);
					
					return theQuestion;
				})}
			</div>
		</div>
	);
	// return (
	// 	<div className="main">
	// 		<div className="flexWrapper">
	// 			<button className="Abutton" onClick={() => navigate("/askQuestion")}>
	// 				Ask Question
	// 			</button>
	// 			<input type="text" placeholder="Search Questions" className="Ainput" />
	// 			<h1>Welcome {username}</h1>
	// 		</div>

	// 		<div className="allQuestions">
	// 			<h1> Questions</h1>
	// 			{lastQuestions?.map((singleQuestion) => {
	// 				let theQuestion = (
	// 					<div className="questions" onClick={() => click(singleQuestion)}>
	// 						<div>
	// 							<img className="questionImage" src={img} alt="" />
	// 							<h2>{singleQuestion.username}</h2>
	// 						</div>

	// 						<h2>{singleQuestion?.title}</h2>
	// 					</div>
	// 				);
	// 				return theQuestion;
	// 			})}
	// 		</div>
	// 	</div>
	// );
}

export default AllQuestions;
