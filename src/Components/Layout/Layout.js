import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../ContextProviders/AppContextProvider";
import PropTypes from "prop-types";
import Project from "./Project/Project";
import SideBar from "./SideBar/SideBar";

import style from "./Layout.module.css";

function Layout(props) {
	const [currentProject, setCurrentProject] = useState("someProjId");
	const [loadedProjects, setLoadedProjects] = useState(["someProjId", "otherProjId"]);
	const [currentUser, setCurrentUser] = useState("User3 name"); //TODO: what about cleanups for effects

	/* useEffect(() => {
		if (!userProjects[currentProject])
			
	}, [currentProject]); 
	
	*/

	return (
		<div className={style["layout"]}>
			<div className={style["side-bar-wrapper"]}>
				<SideBar
					currentProject={currentProject}
					setCurrentProject={setCurrentProject}
					currentUser={currentUser}
				/>
			</div>
			<div className={style["project-wrapper"]}>
				{currentProject ? <Project currentProject={currentProject} /> : <div>SELECT PROJECT!</div>}
			</div>
		</div>
	);
}

Layout.propTypes = {};

export default Layout;
