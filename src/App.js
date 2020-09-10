import React, { useState, useEffect } from "react";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Loader from "./Components/Login/Loader";
import { initUser } from "./Components/ServerProvider/config";
import { useDispatch, useSelector } from "react-redux";
import { setUserDispatch } from "./Components/redux/rootReducer";

import "./App.css";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.user);
	const setUser = (user) => dispatch(setUserDispatch(user));
	const [loading, setLoading] = useState(true);
	async function initApp() {
		const user = await initUser();
		setUser(user);
		setLoading(false);
	}

	useEffect(() => {
		initApp();
	}, []);

	return (
		<div className='app'>
			<header className='App-header'></header>
			{loading && <Loader />}
			{!user?._id ? <Login /> : <Layout />}
		</div>
	);
}

export default App;
