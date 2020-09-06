import axios from "axios";

async function createNewGroup(newGroup) {
	/* try {
		const response = await axios.get("http://localhost:5000/api/v0/projects", newProject, {
			headers: { "Content-Type": "application/json" },
		});
		return response;
	} catch (error) {
		console.error(error);
	} */
}

async function getProjectGroups(projectId) {
	try {
		const response = await axios.get(`http://localhost:5000/api/v0/projects/${projectId}/groups`);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

export { getProjectGroups };
