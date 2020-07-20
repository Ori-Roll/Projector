import React from "react";
import PropTypes from "prop-types";
import style from "./Project.module.css";

function ProjectLoader(props) {
	return (
		<div className={style["project-loader"]}>
			<p>Loading...</p>
		</div>
	);
}

ProjectLoader.propTypes = {};

export default ProjectLoader;
