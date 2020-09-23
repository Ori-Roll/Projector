import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import defaults from "../../defaults";
import Group from "./Group/Group";
import ProjectLoader from "./ProjectLoader";

import { setProjectGroupsDispatch } from "../../redux/rootReducer";

import { getProjectGroups } from "../../ServerProvider/groups";

import style from "./Project.module.css"; // TODO: change from style to: import classes from '..';

function Project() {
	const dispatch = useDispatch();

	const project = useSelector((state) => state?.project);

	const setProjectGroups = (project) => dispatch(setProjectGroupsDispatch(project));

	const [loadingGroups, setLoadingGroups] = useState(true);

	console.log(project);

	async function initGroups() {
		try {
			let groups = await getProjectGroups(project._id);
			groups = groups.data;
			groups.forEach((group) => {
				group.loaded = true;
			});
			setProjectGroups(groups);
			setLoadingGroups(false);
		} catch (error) {
			console.error(error);
		}
	}

	/* console.log("%c Project render", "font-weight: bold; font-size: 18px; color: purple;"); */

	useEffect(() => {
		initGroups();
	}, [project._id]);

	useEffect(() => {
		/* console.log(`%c PROJECT MOUNT ${project}`, "color: red;font-weight: bold; font-size: 15px;"); */
	}, []);

	return (
		<>
			{loadingGroups ? (
				<ProjectLoader />
			) : (
				<div className={style.project}>
					{project.groups?.map((group, i) => {
						return <Group key={group._id} group={group} groupIndex={i} />;
					})}
				</div>
			)}
		</>
	);
}

Project.propTypes = {};

export default Project;
