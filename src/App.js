import React, { useState, useEffect } from "react";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Loader from "./Components/Login/Loader";
import { initUser } from "./Components/ServerProvider/config";
import { getUserProjects, getProject } from "./Components/ServerProvider/projects";
import { useDispatch, useSelector } from "react-redux";
import { setUserDispatch, setProjectDispatch } from "./Components/redux/rootReducer";

import "./App.css";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.user);
	const setUser = (user) => dispatch(setUserDispatch(user));
	const setProject = (project) => dispatch(setProjectDispatch(project));

	const [loading, setLoading] = useState(true);

	async function initApp(withUser) {
		const user = withUser ? { ...withUser } : await initUser();
		if (user) {
			let userProjects = await getUserProjects(false);
			userProjects = userProjects.data;
			user.projects = userProjects;
			const lastProject = user.userLastProject ? user.userLastProject : userProjects[0]._id;
			let projectToOpen = userProjects.find((project) => project._id === lastProject); // await getProject(lastProject._id, true);

			setUser(user);
			setProject(projectToOpen ? projectToOpen : null);
		}
		setLoading(false);
	}

	useEffect(() => {
		initApp();
	}, []);

	return (
		<div className='app'>
			<header className='App-header'></header>
			{loading && <Loader />}
			{!loading && (!user._id ? <Login initApp={initApp} /> : <Layout />)}
		</div>
	);
}

export default App;
