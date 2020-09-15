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

async function getUserProjects(populate = false) {
	try {
		const response = populate
			? await axios.get("http://localhost:5000/api/v0/projects")
			: await axios.get("http://localhost:5000/api/v0/projects?nopopulate=true");
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

async function getProject(projectId, populate = true) {
	try {
		const response = populate
			? await axios.get(`http://localhost:5000/api/v0/projects/${projectId}`)
			: await axios.get("http://localhost:5000/api/v0/projects/${projectId}?nopopulate=true");
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

export { getUserProjects, getProject };
