//db connection
const dbConnection = require("../db/dbConfig");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

// async function getUserByEmail(email) {
// 	return new Promise((resolve, reject) => {
// 		dbConnection.query(
// 			"SELECT username, userid, password FROM users WHERE email = ?",
// 			[email],
// 			(err, results) => {
// 				if (err) {
// 					reject(err);
// 				} else {
// 					resolve(results[0]);
// 				}
// 			}
// 		);
// 	});
// }

async function register(req, res) {
	if (
		!req.body ||
		!req.body.username ||
		!req.body.firstname ||
		!req.body.lastname ||
		!req.body.email ||
		!req.body.password
	) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please provide all required fields!" });
	}
	const { username, firstname, lastname, email, password } = req.body;
	// if (!email || !password || !firstname || !lastname || !username) {
	// 	return res
	// 		.status(StatusCodes.BAD_REQUEST)
	// 		.json({ msg: "please provide all required fields!" });
	// }

	try {
		const [user] = await dbConnection.query(
			"SELECT username, userid FROM users where username = ? or email =?",
			[username, email]
		);
		if (user.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "user already existed" });
		}
		if (password.length < 8) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "password must be at least 8 charachters" });
		}
		//encrypt the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		await dbConnection.query(
			"INSERT INTO users (username, firstname, lastname, email, password) VALUES(?,?,?,?,?)",
			[username, firstname, lastname, email, hashedPassword]
		);
		return res.status(StatusCodes.CREATED).json({ msg: "user registered" });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong, try again later!" });
	}
}

async function login(req, res) {
	if (!req.body || !req.body.email || !req.body.password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please enter all provides" });
	}
	const { email, password } = req.body;
	
	try {
		const [user] = await dbConnection.query(
			"SELECT username, userid, password FROM users WHERE email =? ",
			[email]
		);
		console.log(user);

		if (user.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: " user is not found" });
		}

		//compare password
		const isMatch = await bcrypt.compare(password, user[0].password);
		// console.log("Boolean value", isMatch);
		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Invalid credential" });
		}

		// return res.status(StatusCodes.OK).json(user[0]);

		const username = user[0].username;
		const userid = user[0].userid;
		const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
			expiresIn: "5d",
		});
		return res
			.status(StatusCodes.OK)
			.json({ msg: "user login successful", token });



	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong, try again later!" });
	}
}
// async function login(req,res) {
// 	// destructuring req.body
// 	const { email, password } = req.body;

// 	// Validation
// 	if (!email || !password)
// 		return res.status(400).json({ msg: "Not all fields have been provided!" });

// 	try {
// 		const user = await getUserByEmail(email);

// 		if (!user) {
// 			return res
// 				.status(404)
// 				.json({ msg: "No account with this email has been registered" });
// 		}

// 		// Check the provided password by the user with the encrypted password from the database
// 		const isMatch = await bcrypt.compare(password, user.password);

// 		if (!isMatch) return res.status(404).json({ msg: "Invalid Credentials" });

// 		// Create a token for the signed user that expires in 1 hour
// 		const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, {
// 			expiresIn: "1h",
// 		});

// 		// Return the token and user info
// 		return res.json({
// 	        token,
// 	        user: {
// 	            id: results.userid,
// 	            display_name: results.username
// 	        }
// 	    })
// 		// return res.json({
// 		// 	token,
// 		// 	user: {
// 		// 		id: user.userid,
// 		// 		display_name: user.username,
// 		// 	},
// 		// });
// 	} catch (error) {
// 		console.log(error.message);
// 		return res
// 			.status(StatusCodes.INTERNAL_SERVER_ERROR)
// 			.json({ msg: "Something went wrong, try again later!" });
// 	}

// 	// //validation
// 	// if (!email || !password)
// 	//     return res
// 	//         .status(400)
// 	//         .json({ msg: 'Not all fields have been provided!' })

// 	// //sending data to check if email exist on our database
// 	// getUserByEmail(email, (err, results) => {
// 	//     if (err) {
// 	//         console.log(err);
// 	//         res.status(500).json({ msg: "database connection err" })
// 	//     }
// 	//     if (!results) {
// 	//         return res
// 	//             .status(404)
// 	//             .json({ msg: "No account with this email has been registered" })
// 	//     }

// 	//     //check provided password by the user with the encrypted password from database
// 	//     const isMatch = bcrypt.compareSync(password, results.user[0].password);
// 	//     if (!isMatch)
// 	//         return res
// 	//             .status(404)
// 	//             .json({ msg: "Invalid Credentials" })

// 	//     //creating token for the signed user that expires in 1 hour and using our secret key for creation
// 	//     const token = jwt.sign({ id: results.userid }, process.env.JWT_SECRET, { expiresIn: "1h" });

// 	//     //returning token and user-info
// 	//     return res.json({
// 	//         token,
// 	//         user: {
// 	//             id: results.userid,
// 	//             display_name: results.username
// 	//         }
// 	//     })
// 	// })
// }

async function checkUser(req, res) {
	const username = req.user.username;
	const userid = req.user.userid;

	res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
