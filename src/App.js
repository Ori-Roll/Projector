import React from "react";
import Layout from "./Components/Layout/Layout";
import AppContextProvider from "./Components/ContextProviders/AppContextProvider";

import "./App.css";

function App() {
	return (
		<div className='app'>
			<header className='App-header'></header>
			<AppContextProvider>
				<Layout />
			</AppContextProvider>
		</div>
	);
}

export default App;
