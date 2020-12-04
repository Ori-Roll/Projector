import React, { useState, useEffect } from 'react';
import { setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import axios from 'axios';

import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Loader from './Components/Login/Loader';
import { initUser } from './ServerProvider/config';
import {
  db_getUserProjects,
  getProject,
  getProjectTypes,
} from './ServerProvider/projects';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUserDispatch,
  setProjectDispatch,
  changeAppGlobalsDispatch,
} from './Components/redux/rootReducer';

import './App.css';

function App() {
  const user = useSelector((state) => state?.user);
  const globals = useSelector((state) => state?.app);
  const dispatch = useDispatch();
  const setUser = (user) => dispatch(setUserDispatch(user));
  const setProject = (project) => dispatch(setProjectDispatch(project));
  const changeAppGlobals = (globalsToChange) =>
    dispatch(changeAppGlobalsDispatch(globalsToChange));

  const [loading, setLoading] = useState(true);

  async function initApp(withUser) {
    /* setDefaultLocale('es', es) */
    axios.defaults.withCredentials = true;
    try {
      const user = withUser ? { ...withUser } : await initUser();
      if (user) {
        let projectTypesRes = await getProjectTypes();
        changeAppGlobals({ projectTypes: projectTypesRes });
        let userProjects = await db_getUserProjects(false);
        userProjects = userProjects.data;
        user.projects = userProjects;
        let lastOpenedProject;
        if (user.lastOpenedProject) {
          lastOpenedProject = user.lastOpenedProject;
        } else if (userProjects[0]) {
          lastOpenedProject = userProjects[0]._id;
        } else {
          lastOpenedProject = null;
        }
        let projectToOpen = userProjects.find(
          (project) => project._id === lastOpenedProject
        ); // await getProject(lastProject._id, true);
        setUser(user);
        setProject(projectToOpen ? projectToOpen : null);
      }
      setLoading(false);
    } catch (error) {
      console.error('error setting up app', error);
    }
  }

  useEffect(() => {
    initApp();
  }, []);

  return (
    <div className="app" style={globals?.cssVariables}>
      <header className="App-header"></header>
      {loading && <Loader />}
      {!loading &&
        (!user || !user._id ? <Login initApp={initApp} /> : <Layout />)}
    </div>
  );
}

export default App;
