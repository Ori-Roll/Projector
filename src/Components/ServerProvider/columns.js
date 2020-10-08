import axios from "axios";

async function createNewColumn(group) {
	//This gets a group in return !

	const reqBodyToSend = { group: group._id, project: group.project, type: "text" };

	try {
		const response = await axios.post(
			`http://localhost:5000/api/v0/projects/${group.project}/columns`,
			reqBodyToSend,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		console.log("response.data", response.data.data);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

export { createNewColumn };
