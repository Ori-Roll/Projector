import React from "react";
import PropTypes from "prop-types";

import Tab from "./Tab/Tab";

import style from "./Project.module.css"; // TODO: change from style to: import classes from '..';

function Project(props) {
	return (
		<div className={style.project}>
			<Tab />
		</div>
	);
}

Project.propTypes = {};

export default Project;
