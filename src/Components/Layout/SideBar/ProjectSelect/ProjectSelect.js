import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import style from "./ProjectSelect.module.css";

import { setProjectDispatch } from "../../../redux/rootReducer";

import { getProject } from "../../../ServerProvider/projects";
import AppIcon from "../../../../GlobalComponents/AppIcon/AppIcon";

function ProjectSelect({projectSelectActive, setProjectSelectActive}) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state?.user);
	const project = useSelector((state) => state.project);
	const setProject = (project) => dispatch(setProjectDispatch(project));



	async function setSelectedProject(projectId) {
		try {
			const newProjectRes = await getProject(projectId, true);
			setProject(newProjectRes.data);
			setProjectSelectActive(false);
			// "TODO: This needs to control loader for project";
		} catch (error) {
			console.error(error.response.data);
		}
	}



	return (
		<div className={style["project-select-menu"]} style={{left: projectSelectActive ? "50px" : "-234px"}} onBlur={()=>setProjectSelectActive(false)}>
			{/* <div className={style["current-project-display"]}>{project?.name && project.name}</div> */}
			<p className={style["vertical-side-header"]}>Select Project</p>
			<AppIcon icon="app-icon-back-arrow.png" onClickCallback={() => setProjectSelectActive(false)} />
			<div className={style["project-select-list"]}>
				{user.projects
					? user.projects.map((project) => {
							return (
								<button
									className={style["project-select-btn"]}
									key={`${project._id}BTN`}
									onClick={(e) => setSelectedProject(project._id)}>
									{project.name === " " ? "nameless project" : project.name}
								</button>
							);
					})
					: " ! no projects ! "}
				</div>
			</div>
			/* TODO: change so it will load a proj if no viewed proj */
			
	);
}

ProjectSelect.propTypes = {};

export default ProjectSelect;
