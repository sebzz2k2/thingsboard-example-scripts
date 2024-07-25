const {Pool, Client} = require("pg");
require('dotenv').config()

const pool = new Pool({
	user: process.env.PSQL_USER,
	host: process.env.PSQL_HOST,
	database: process.env.PSQL_DATABASE,
	password: process.env.PSQL_PASSWORD,
	port: parseInt(process.env.PSQL_PORT),
});


/*
	* @param {string} query - The query to execute
	* @param {Array} params - The parameters to pass to the query
	* @returns {Promise} - The result of the query execution
	* @description - This function is used to execute a query on the database
*/

const executeQuery = async (query, params) => {
	const client = await pool.connect();
	try {
		const results = await client.query(query, params);
		return results;
	} catch (err) {
		throw err;
	} finally {
		client.release();
	}
};

module.exports = {
	executeQuery,
};
