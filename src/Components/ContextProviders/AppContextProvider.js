import React, { useState, createContext } from "react";

export const AppContext = createContext();

function AppContextProvider(props) {
	const [userProjects, setUserProjects] = useState(["someProjId", "otherProjId"]);

	return (
		<AppContext.Provider
			value={{
				userProjects: userProjects,
			}}>
			{props.children}
		</AppContext.Provider>
	);
}

AppContextProvider.propTypes = {};

export default AppContextProvider;
