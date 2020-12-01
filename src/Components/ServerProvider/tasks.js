import axios from 'axios';

async function db_createNewTask(task) {
  try {
    !task.project && console.error(`New task does not have a project`);
    !task.group && console.error(`New task does not have a group`);
    if (!task.title) task.title = ' ';
    const response = await axios.post(
      `http://localhost:5000/api/v0/projects/${task.project}/tasks`,
      task,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log('ADDED NEW TASK');
    let dueDate = response.data.data.dueDate;
    if (dueDate) {
      console.log('dueDate', dueDate);
      dueDate = new Date(dueDate);
    }

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
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (response.data.data.dueDate)
      response.data.data.dueDate = new Date(response.data.data.dueDate);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_deleteTask(task) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v0/projects/${task.project}/tasks/${task._id}`,
      task,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_deleteTasks(tasks, project) {
  console.log('tasks are ', tasks);
  console.log('project is ', project);
  /* const config = document.cookie.getAuthentication(); // AxiosRequestConfig
	config.data = {payload: tasks}; */

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v0/projects/${project}/tasks/${tasks}`
    );
    const groupRes = response.data.data;
    groupRes.tasks = groupRes.tasks.map((task) => {
      if (task.dueDate) task.dueDate = new Date(task.dueDate);
      return task;
    }); // TODO: not good. This needs to be automatically applied to all responses
    return groupRes;
  } catch (error) {
    console.error(error.response.data);
  }
}

export { db_createNewTask, db_changeTask, db_deleteTask, db_deleteTasks };