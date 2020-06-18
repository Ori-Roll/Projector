import React from "react";
import PropTypes from "prop-types";
import style from "./Project.module.css";
import Tab from "./Tab/Tab";

function Project(props) {
	return (
		<div className={style.project}>
			<Tab />
		</div>
	);
}

Project.propTypes = {};

export default Project;
