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
		response.data.data.forEach((group) => {
			group.tasks.forEach(task => {
				if(task.dueDate) task.dueDate = new Date(task.dueDate);
			})
		});
		console.log(response.data.data);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
	
}

export { getProjectGroups };
