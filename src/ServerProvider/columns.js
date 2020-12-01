import axios from 'axios';

async function db_createNewColumn(group, type = 'text') {
  //This gets a group in return !

  const reqBodyToSend = {
    group: group._id,
    project: group.project,
    type: type,
  };

  try {
    const response = await axios.post(
      `http://localhost:5000/api/v0/projects/${group.project}/columns`,
      reqBodyToSend,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const groupRes = response.data.data;
    groupRes.tasks = groupRes.tasks.map((task) => {
      if (task.dueDate) task.dueDate = new Date(task.dueDate);
      return task;
    }); // TODO: not good. This needs to be automatically applied to all responses

    return groupRes;
    // TODO: make all endpoints return data.data and correct all Comp` that use them
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_editColumn(column) {
  //This gets a group in return !
  console.log('attempting column ', column);
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v0/projects/${column.project}/columns/${column._id}`,
      column,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

export { db_createNewColumn, db_editColumn };
