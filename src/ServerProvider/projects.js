import axios from 'axios';

async function createNewProject(newProject) {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v0/projects',
      newProject,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function db_getUserProjects(populate = false) {
  try {
    const response = populate
      ? await axios.get('http://localhost:5000/api/v0/projects')
      : await axios.get(
          'http://localhost:5000/api/v0/projects?nopopulate=true'
        );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function getProject(projectId, populate = true) {
  try {
    const response = populate
      ? await axios.get(`http://localhost:5000/api/v0/projects/${projectId}`)
      : await axios.get(
          'http://localhost:5000/api/v0/projects/${projectId}?nopopulate=true'
        );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function getProjectTypes() {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/v0/projecttypes'
    );
    return response.data.data;
  } catch (error) {
    console.error('Could not get project types', error);
  }
}

async function db_updateProject(project) {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v0/projects/${project._id}`,
      project
    );
    return response.data.data;
  } catch (error) {
    console.error('Could chane project', error);
  }
}
/* 
async function getProjectTypePhoto(photo){
	try {
		const response = await axios.get(`http://localhost:5000/api/v0/projectTypes/${photo}`)
		return response.data;
	} catch (error){
		console.error(error)
	}
} */

export {
  db_getUserProjects,
  getProject,
  createNewProject,
  getProjectTypes,
  db_updateProject,
};