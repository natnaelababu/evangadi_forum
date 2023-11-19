const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
	user: process.env.MYSQL_USER,
	database: process.env.MYSQL_DB,
	host: process.env.MYSQL_HOST,
	password: process.env.MYSQL_PASS,
	connectionLimit: 10,
});

// dbConnection.execute("select 'test' ", (err, result) => {
// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		console.log(result);
// 	}
// });

module.exports = dbConnection.promise();
