import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import style from "./ProjectSelect.module.css";

import { setProjectDispatch } from "../../../redux/rootReducer";

import { getProject } from "../../../ServerProvider/projects";

function ProjectSelect() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state?.user);
	const project = useSelector((state) => state.project);
	const setProject = (project) => dispatch(setProjectDispatch(project));

	async function setSelectedProject(projectId) {
		try {
			const newProjectRes = await getProject(projectId, true);
			setProject(newProjectRes.data);
			// "TODO: This needs to control loader for project";
		} catch (error) {
			console.error(error.response.data);
		}
	}

	/* 	function onProjectClick(projectId) {
		setSelectedProject(projectId);
	} */
	return (
		<div className={style["project-select"]}>
			<div className={style["project-select-folder-lable"]} />
			{/* TODO: change so it will load a proj if no viewed proj */}
			<div className={style["current-project-display"]}>{project?.name && project.name}</div>
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
	);
}

ProjectSelect.propTypes = {};

export default ProjectSelect;
