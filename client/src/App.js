import React, { useEffect, useState } from "react";
import axios from "./Components/axios"
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import SharedPage from "./Components/SharedPage/SharedPage";
import NotFound from "./Components/NotFound/NotFound";
import AllQuestions from "./Components/Question/AllQuestions";
import { stateValue } from "./Components/Context/context";
import SingleQuestion from "./Components/Question/SingleQuestion";
import AskQuestion from "./Components/Question/AskQuestion";

function App() {
	let [username, setusername] = useState("");
	const token = localStorage.getItem("token");
	console.log("this is the token", token);
	let navigate = useNavigate();

	try {
		axios
			.get("/users/check/", {
				headers: {
					authorization: "Bearer " + token,
				},
			})
			.then((response) => {
				if (response.data.username) {
					setusername(response.data.username);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	} catch (error) {
		console.log(error);
	}


	// useEffect(() => {
	// 	console.log("app.js use effect");
	// 	fetch("http://localhost:8000/api/users/check", {
	// 		headers: {
	// 			authorization: "Bearer " + token,
	// 		},
	// 	})
	// 		.then((data) => data.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setUserName(data.username);
	// 			console.log("in the data function");
	// 			console.log(data.msg);
	// 			if (
	// 				data.msg === "token not provide" ||
	// 				data.msg === "Authentication Invalid"
	// 			)
	// 				navigate("/");
	// 		})
	// 		.catch((error) => {
	// 			console.log("in the catch function");
	// 			navigate("/");
	// 		});
	// }, []);

	return (
		<>
			<stateValue.Provider value={{ username, setusername }}>
				<Routes>
					<Route path="/" element={<SharedPage />}>
						<Route path="/" element={<Home />} />
						<Route path="/allquestion" element={<AllQuestions />} />
						<Route path="*" element={<NotFound />} />
						<Route
							path="/single-question/:questionid"
							element={<SingleQuestion />}
						/>
						<Route path="/askQuestion" element={<AskQuestion />} />
					</Route>
				</Routes>
			</stateValue.Provider>
		</>
	);
}

export default App;
