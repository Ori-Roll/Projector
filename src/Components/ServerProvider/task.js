import axios from "axios";

async function createNewTask(task) {
	try {
		!task.project && console.error(`New task does not have a project`);
		!task.group && console.error(`New task does not have a group`);
		if (!task.title) task.title = " ";
		const response = await axios.post(
			`http://localhost:5000/api/v0/projects/${task.project}/tasks`,
			task,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		if(response.data.data.dueDate) response.data.data.dueDate = new Date(response.data.data.dueDate);
	
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

async function db_changeTask(task) {
	try {
		!task.project && console.error(`New task does not have a project`);
		!task.group && console.error(`New task does not have a group`);
		!task._id && console.error(`New task does not have an _id`);
		const response = await axios.put(
			`http://localhost:5000/api/v0/projects/${task.project}/tasks/${task._id}`,
			task,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		if(response.data.data.dueDate) response.data.data.dueDate = new Date(response.data.data.dueDate);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

export { createNewTask, db_changeTask };
