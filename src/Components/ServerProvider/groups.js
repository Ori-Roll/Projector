import axios from 'axios';

async function db_createNewGroup(projectId) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v0/projects/${projectId}/groups`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getProjectGroups(projectId) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v0/projects/${projectId}/groups`
    );
    response.data.data.forEach((group) => {
      group.tasks.forEach((task) => {
        if (task.dueDate) task.dueDate = new Date(task.dueDate);
      });
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_updateGroup(group) {
  try {
    !group.project && console.error(`New group does not have a project`);
    !group._id && console.error(`New group does not have an _id`);

    const response = await axios.put(
      `http://localhost:5000/api/v0/projects/${group.project}/groups/${group._id}`,
      group,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const updatedGroup = response.data.data;
    if (updatedGroup.dueDate)
      updatedGroup.dueDate = new Date(updatedGroup.dueDate);
    updatedGroup.loaded = true;
    return updatedGroup;
  } catch (error) {
    console.error(error.response.data);
  }
}

// @route     PUT /api/v0/projects/:projectId/groups/:groupId

export { getProjectGroups, db_createNewGroup, db_updateGroup };
