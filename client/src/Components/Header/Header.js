import React, { useContext, useState } from "react";
import "../Header/Header.css";
import logo from "../Images/logo2.png";
import { stateValue } from "../Context/context";
import { Link, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
	const token = localStorage.getItem("token");
	let [phoneLogout, setPhoneLogout] = useState(false);
	let navigate = useNavigate();
	let { username, setusername } = useContext(stateValue);
	function logoutHandler() {
		localStorage.setItem("token", "");
		setusername("");
		navigate("/");
		window.location.reload();
	}
	function hamHandler() {
		if (username) setPhoneLogout(!phoneLogout);
	}
	return (
		<>
			<Navbar
				bg="light"
				expand="lg"
				className="py-3 shadow-lg position-sticky w-100 "
				style={{
					zIndex: "99",
					top: "0",
				}}
			>
				<Container>
					<Navbar.Brand href="/">
						<img src={logo} alt="" />
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls={`offcanvasNavbar-expand-lg`}
					></Navbar.Toggle>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-lg`}
						aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
						placement="end"
					>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 ">
								<Nav.Link href="#">Home</Nav.Link>
								<Nav.Link href="#">How it works</Nav.Link>
								{token && (
									<h6
										style={{
											cursor: "pointer",
										}}
										className="fw-bold py-2 px-3 c-pointer"
										onClick={logoutHandler}
									>
										Log out
									</h6>
								)}
							</Nav>
							{!token && (
								<Nav>
									<Button className="px-5" variant="primary">
										SIGN IN
									</Button>
								</Nav>
							)}
						</Offcanvas.Body>
					</Navbar.Offcanvas>

					{/* <div className="row">
						<div className="col-10 col-md-6">
							<Link to="/allquestion">
								<img className="evangadiImage" src={logo} alt="evangadi logo" />
							</Link>
						</div>
						<div className="col-1 d-md-none">
							<MenuIcon className="" onClick={hamHandler} />
						</div>
						<div className="d-none d-md-block col-md-6">
							<ul className="lists ">
								<li>Home</li>
								<li>How it works</li>
								<div className="">
									<li>
										{username ? (
											<h6
												style={{
													cursor: "pointer",
												}}
												className="fw-bold py-2 px-3 c-pointer"
												onClick={logoutHandler}
											>
												Log out
											</h6>
										) : (
											<button className="button">SIGN IN</button>
										)}
									</li>
								</div>
							</ul>
						</div>
					</div> */}
					{/* <div className="phoneLogout d-md-none">
						<button
							onClick={logoutHandler}
							className={`${phoneLogout ? "" : "display"}`}
						>
							Logout
						</button>
					</div> */}
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
