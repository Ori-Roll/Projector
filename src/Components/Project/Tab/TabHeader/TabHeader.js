import React from "react";
import PropTypes from "prop-types";

import style from "./TabHeader.module.css";

function TabHeader(props) {
	return <div className={style["tab-header"]}>This is a header</div>;
}

TabHeader.propTypes = {};

export default TabHeader;
