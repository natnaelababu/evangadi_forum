import React, { useState, useEffect, useContext } from "react";
import "../RegisterAndLogin/RegisterAndLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { stateValue } from "../Context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function RegisterAndLogin() {
	const navigate = useNavigate();

	let { username, setusername } = useContext(stateValue);
	useEffect(() => {
		setusername("");
		localStorage.setItem("token", "");
	}, []);
	//to toggle the register and login form
	//updated toogle
	let [firstToogle, setFirstToggle] = useState(true);
	function registerAndLoginToogler() {
		setFirstToggle(!firstToogle);
	}
	//states to store register data
	let [registerResponse, setRegisterResponse] = useState("");
	let [email, setEmail] = useState("");
	let [firstName, setFirstName] = useState("");
	let [lastName, setLastName] = useState("");
	let [userName, setUserName] = useState("");
	let [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	function agreeAndJoinHandler(e) {
		e.preventDefault();
		let data = {
			email: email,
			firstname: firstName,
			lastname: lastName,
			username: userName,
			password: password,
		};
		fetch("http://localhost:8000/api/users/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setRegisterResponse(data.msg);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	//states to store login data
	let [loginResponse, setLoginResponse] = useState("");
	let [loginEmail, setLoginEmail] = useState("");
	let [loginPassword, setLoginPassword] = useState("");

	function loginHandler(e) {
		e.preventDefault();
		let loginData = {
			email: loginEmail,
			password: loginPassword,
		};
		fetch("http://localhost:8000/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setLoginResponse(data.msg);
				const token = data.token;
				localStorage.setItem("token", token);
				if (data.msg == "user login successful") {
					navigate("/allquestion");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	//to toggle the register and login form
	// let [regDis, setRegDis] = useState("display");
	// let [logDis, setLogDis] = useState("");
	// function registerDisplay() {
	// 	setRegDis("display");
	// 	setLogDis("");
	// }
	// function loginDisplay() {
	// 	setLogDis("display");
	// 	setRegDis("");
	// }

	return (
		<div className="container">
			<div className="row">
				{/* register */}

				<form onSubmit={agreeAndJoinHandler}>
					<div className={`${firstToogle ? "display" : ""}`}>
						<div className="mainRegisterWrapper">
							<div className="secondRegisterWrapper">
								<div className="joinNetwork">
									<h3 className="textCenter">Join the network</h3>
									<p className="textCenter">
										Already have an account?{" "}
										<span className="orange" onClick={registerAndLoginToogler}>
											Sign in
										</span>
									</p>
								</div>

								<h3 className="red">{registerResponse}</h3>

								<div className="inputs">
									<input
										type="email"
										placeholder="Email"
										name="email"
										onChange={(e) => setEmail(e.target.value)}
									/>
									<br />
									<div className="firstAndLastName">
										<input
											type="text"
											placeholder="First Name"
											onChange={(e) => setFirstName(e.target.value)}
										/>
										<br />
										<input
											type="text"
											placeholder="Last Name"
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>

									<br />
									<input
										type="text"
										placeholder="User Name"
										onChange={(e) => setUserName(e.target.value)}
									/>
									<br />
									<input
										type="password"
										placeholder="Password"
										onChange={(e) => setPassword(e.target.value)}
									/>
									<div className="textCenter">
										<button className="button" onClick={agreeAndJoinHandler}>
											Agree and Join
										</button>
									</div>

									<p className="textCenter">
										I agree to the <Link>privacy policy</Link> and{" "}
										<Link>terms of service.</Link>
									</p>
									<p className="textCenter">
								
										<p className="orange already" onClick={registerAndLoginToogler}>
											Already have an account?
										</p>
									</p>
								</div>
							</div>
						</div>
					</div>
				</form>

				{/* login */}
				<div className={`${firstToogle ? "" : "display"}`}>
					<div className="mainRegisterWrapper">
						<div className="secondRegisterWrapper">
							<div className="joinNetwork">
								<h3 className="textCenter">Login to your account</h3>
								<p className="textCenter">
									Don’t have an account?
									<span className="orange" onClick={registerAndLoginToogler}>
										Create a new account
									</span>
								</p>
							</div>

							<div className="inputs">
								<input
									type="email"
									placeholder="Email"
									onChange={(e) => setLoginEmail(e.target.value)}
								/>
								<br />
								{/* <input
								type="password"
								placeholder="Password"
								onChange={(e) => setLoginPassword(e.target.value)}
							/> */}
								<div className="password-input-container">
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										value={loginPassword}
										onChange={(e) => setLoginPassword(e.target.value)}
									/>
									<button
										onClick={() => setShowPassword(!showPassword)}
										className="eye-button"
									>
										<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />{" "}
									</button>
								</div>
								<div className="agreement">
									<small>
										I agree to the <a href=""> privacy policy</a> and{" "}
										<a href=""> terms of service.</a>
									</small>
								</div>

								<div className="textCenter">
									<button className="button" onClick={loginHandler}>
										Login
									</button>
								</div>
								<h3 className="red">{loginResponse}</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		// <div className="container">
		// 	<div className="row">
		// 		{/* register */}
		// 		<form onSubmit={agreeAndJoinHandler}>
		// 			<div className={`${firstToogle ? "display" : ""}`}>
		// 				<div className="mainRegisterWrapper">
		// 					<div className="secondRegisterWrapper">
		// 						<div className="joinNetwork">
		// 							<h3 className="textCenter">Join the network</h3>
		// 							<p className="textCenter">
		// 								Already have an account?{" "}
		// 								<span className="orange" onClick={registerAndLoginToogler}>
		// 									Sign in
		// 								</span>
		// 							</p>
		// 						</div>

		// 						<h5 className="red">{registerResponse}</h5>

		// 						<div className="inputs">
		// 							<input
		// 								type="email"
		// 								placeholder="Email"
		// 								name="email"
		// 								onChange={(e) => setEmail(e.target.value)}
		// 							/>
		// 							<br />
		// 							<div className="firstAndLastName">
		// 								<input
		// 									type="text"
		// 									placeholder="First Name"
		// 									onChange={(e) => setFirstName(e.target.value)}
		// 								/>
		// 								<br />
		// 								<input
		// 									type="text"
		// 									placeholder="Last Name"
		// 									onChange={(e) => setLastName(e.target.value)}
		// 								/>
		// 							</div>

		// 							<br />
		// 							<input
		// 								type="text"
		// 								placeholder="User Name"
		// 								onChange={(e) => setUserName(e.target.value)}
		// 							/>
		// 							<br />
		// 							<input
		// 								type="password"
		// 								placeholder="Password"
		// 								onChange={(e) => setPassword(e.target.value)}
		// 							/>
		// 							<div className="textCenter">
		// 								<button className="button" type="submit">
		// 									Agree and Join
		// 								</button>
		// 							</div>

		// 							<p className="textCenter">
		// 								I agree to the <Link>privacy policy</Link> and{" "}
		// 								<Link>terms of service.</Link>
		// 							</p>
		// 							<p className="textCenter">
		// 								<br />
		// 								<p className="orange" onClick={registerAndLoginToogler}>
		// 									Already have an account?
		// 								</p>
		// 							</p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</form>

		// 		{/* login */}
		// 		<div className={`${firstToogle ? "" : "display"}`}>
		// 			<div className="mainRegisterWrapper">
		// 				<div className="secondRegisterWrapper">
		// 					<div className="joinNetwork">
		// 						<h3 className="textCenter">Login to your account</h3>
		// 						<p className="textCenter">
		// 							Don’t have an account?
		// 							<span className="orange" onClick={registerAndLoginToogler}>
		// 								Create a new account
		// 							</span>
		// 						</p>
		// 					</div>

		// 					<div className="inputs">
		// 						<input
		// 							type="email"
		// 							placeholder="Email"
		// 							onChange={(e) => setLoginEmail(e.target.value)}
		// 						/>
		// 						<br />
		// 						<input
		// 							type="password"
		// 							placeholder="Password"
		// 							onChange={(e) => setLoginPassword(e.target.value)}
		// 						/>
		// 						<p className="forgetPass orange">Forgot password?</p>
		// 						<div className="textCenter">
		// 							<button className="button loginButton" onClick={loginHandler}>
		// 								Login
		// 							</button>
		// 						</div>
		// 						<h5 className="red">{loginResponse}</h5>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
}

export default RegisterAndLogin;
