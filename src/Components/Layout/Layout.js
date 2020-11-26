import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import Project from "./Project/Project";
import SideBar from "./SideBar/SideBar";
import style from "./Layout.module.css";

//TODO: what about cleanups for effects

function Layout() {
	const user = useSelector((state) => state?.user);

	const project = useSelector((state) => state?.project);

	/* console.log("%c Layout render", "font-weight: bold; font-size: 20px; color: purple;"); */

	return (
		<div>
			<div className={style["layout"]}>
				<div className={style["side-bar-wrapper"]}>
					<SideBar user={user} />
				</div>
				<div className={style["project-head"]}>this</div>
				<div className={style["project-wrapper"]}>
					{project?._id ? <Project /> : <div>SELECT PROJECT!</div>}
				</div>
			</div>
		</div>
	);
}

Layout.propTypes = {};

export default Layout;
