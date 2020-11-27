import axios from "axios";

async function db_createNewGroup(projectId) {
	try {
		const response = await axios.post(`http://localhost:5000/api/v0/projects/${projectId}/groups`);
		return response.data.data;
	} catch (error) {
		console.error(error);
	}
}

async function getProjectGroups(projectId) {
	try {
		const response = await axios.get(`http://localhost:5000/api/v0/projects/${projectId}/groups`);
		response.data.data.forEach((group) => {
			group.tasks.forEach(task => {
				if(task.dueDate) task.dueDate = new Date(task.dueDate);
			})
		});
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
	
}

export { getProjectGroups, db_createNewGroup };
