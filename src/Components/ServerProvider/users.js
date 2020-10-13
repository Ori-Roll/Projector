import axios from "axios";

async function db_getUsersByEmailQuery(query) {
	try {
		const response = await axios.get(`http://localhost:5000/api/v0/users?sort=name&email=${query}`);
		console.log("GOT USERS: ", response.data.data);
		return response.data.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

export { db_getUsersByEmailQuery };
