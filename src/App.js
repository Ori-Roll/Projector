import React from "react";
import Layout from "./Components/Layout/Layout";
import ContextProvider from "./Components/ContextProvider/ContextProvider";

import "./App.css";

function App() {
	return (
		<div className='app'>
			<header className='App-header'></header>
			<ContextProvider>
				<Layout />
			</ContextProvider>
		</div>
	);
}

export default App;
