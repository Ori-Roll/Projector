import React, { useState, useEffect, useContext, useCallback } from "react";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Loader from "./Components/Login/Loader";
import { initUser } from "./Components/ServerProvider/config";
import { AppContext } from "./Components/ContextProviders/AppContextProvider";

import "./App.css";

function App() {
	const { currentUser, setCurrentUser } = useContext(AppContext);

	const [loading, setLoading] = useState(true);

	async function initApp() {
		const user = await initUser();
		setCurrentUser(user);
		setLoading(false);
	}

	useEffect(() => {
		initApp();
	}, []);

	return (
		<div className='app'>
			<header className='App-header'></header>
			{loading && <Loader />}
			{!currentUser ? <Login /> : <Layout />}
		</div>
	);
}

export default App;
