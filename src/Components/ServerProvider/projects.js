import axios from "axios";

async function createNewProject(newProject) {
	try {
		const response = await axios.get("http://localhost:5000/api/v0/projects", newProject, {
			headers: { "Content-Type": "application/json" },
		});
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function getUserProjects() {
	try {
		const response = await axios.get("http://localhost:5000/api/v0/projects");
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

export { getUserProjects };
