const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "Lucky@12345",
	database: "air_bnb",
});
module.exports = pool.promise();
