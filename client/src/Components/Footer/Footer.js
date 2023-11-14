// import React from 'react';
// import "../Footer/Footer.css";
// import img from "../Images/logo1.png";
// function Footer() {
//   return (
// 		<div className="mainFooterWrapper">
// 			<div>
// 				<img
// 					src={img}
// 					alt="evangadi logo"
// 				/>
// 			</div>
// 			<div>
// 				<ul className="footer">
// 					<li>
// 						<h3>Useful Link</h3>
// 					</li>
// 					<div className="color">
// 						<li>How it works</li>
// 						<li>Terms of Service</li>
// 						<li>Privacy policy</li>
// 					</div>
// 				</ul>
// 			</div>

// 			<div>
// 				<ul className="footer">
// 					<li>
// 						<h3>Contact Info</h3>
// 					</li>
// 					<div className="color">
// 						<li>Evangadi Networks</li>
// 						<li>support@evangadi.com</li>
// 						<li>+1-202-386-2702</li>
// 					</div>
// 				</ul>
// 			</div>
// 		</div>
// 	);
// }

// export default Footer;
import React from "react";
import "../Footer/Footer.css";
import Container from "react-bootstrap/Container";
import logo from "../Images/logo1.png";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
// import { AiFillFacebook } from "react-icons/ai";
// import { TiSocialInstagram } from "react-icons/ti";
// import { AiFillYoutube } from "react-icons/ai";
// const Footer = () => {
// 	return (
// 		<div className="footer-top">
// 			<div className="container">
// 				<div className="footer-bottom-content clearfix">
// 					<div className="row">
// 						<div className="col-lg-4 col-md-4">
// 							<div className="logo-footer">
// 								<a className="navbar-brand" href="/">
// 									{" "}
// 									<img src={Logo} alt="" />
// 								</a>
// 							</div>

// 							<ul className="footer-social-list list-social list-inline">
// 								<li>
// 									<a
// 										href="https://www.facebook.com/EthiopiansNetwork"
// 										target="_blank"
// 									>
// 										{" "}
// 										<AiFillFacebook />
// 										<i className="social_facebook "></i>
// 									</a>
// 								</li>
// 								<li>
// 									<a
// 										href="https://www.instagram.com/evangaditech/"
// 										target="_blank"
// 									>
// 										<TiSocialInstagram />
// 										<i className="social_instagram "></i>
// 									</a>
// 								</li>
// 								<li>
// 									<a
// 										href="https://www.youtube.com/c/weareethiopians"
// 										target="_blank"
// 									>
// 										<AiFillYoutube />
// 										<i className="social_youtube "></i>
// 									</a>
// 								</li>
// 							</ul>
// 						</div>
// 						<div className="col-lg-4 col-md-4">
// 							<h5>Useful Link</h5>
// 							<ul className="list-menu">
// 								<li>
// 									<a href="/explained">How it works </a>
// 								</li>
// 								<li>
// 									<a href="/legal/terms/">Terms of Service</a>
// 								</li>
// 								<li>
// 									<a href="/legal/privacy/">Privacy policy</a>
// 								</li>
// 							</ul>
// 						</div>
// 						<div className="col-lg-4 col-md-4">
// 							<h5>Contact Info</h5>
// 							<ul className="list-menu contact-list">
// 								<li>Evangadi Networks</li>
// 								<li>support@evangadi.com</li>
// 								<li>+1-202-386-2702</li>
// 							</ul>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
function Footer() {
	return (
		<>
			<footer
				style={{
					backgroundColor: "#3b455a",
					padding: "60px 0 40px 0",
					color: "rgba(213, 213, 213, 0.6)",
					lineHeight: "1.4em",
					fontSize: "14px",
				}}
			>
				<Container>
					<Row>
						<Col sm={12} md={4} className="my-3">
							<Row>
								<Col sm={12}>
									<img src={logo} alt="" />
								</Col>
								<Row
									style={{
										width: "70%",
										margin: "30px 0",
										fontSize: "25px",
									}}
								>
									<Col sm={4}>
										<a
											href="https://www.facebook.com/EthiopiansNetwork"
											target="_blank"
										>
											<i className="fa-brands fa-facebook text-white"></i>
										</a>
									</Col>

									<Col sm={4}>
										<a
											href="https://www.instagram.com/evangaditech/"
											target="_blank"
										>
											<i className="fa-brands fa-instagram text-white"></i>
										</a>
									</Col>
									<Col sm={4}>
										<a
											href="https://www.youtube.com/c/weareethiopians"
											target="_blank"
										>
											<i className="fa-brands fa-youtube text-white"></i>
										</a>
									</Col>
								</Row>
							</Row>
						</Col>
						<Col sm={12} md={4} className="my-3">
							<h5 className="text-white">Useful Link</h5>
							<ul
								style={{
									listStyle: "none",
									marginLeft: "-25px",
									lineHeight: "30px",
								}}
							>
								<li>
									<a href="https://www.evangadi.com/explained/">How it works</a>
								</li>
								<li>
									<a href="https://www.evangadi.com/legal/terms/">
										Terms of Service
									</a>
								</li>
								<li>
									<a href="https://www.evangadi.com/legal/privacy/">
										Privacy policy
									</a>
								</li>
							</ul>
						</Col>
						<Col sm={12} md={4} className="my-3">
							<h5 className="text-white">Contact Info </h5>

							<ul
								style={{
									listStyle: "none",
									marginLeft: "-25px",
									lineHeight: "30px",
								}}
							>
								<li>
									<a href="">Evangadi Networks</a>
								</li>
								<li>
									<a href="">contact@naty12.com</a>
								</li>
								<li>
									<a href="">+251-93-536-4560</a>
								</li>
							</ul>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
}

export default Footer;