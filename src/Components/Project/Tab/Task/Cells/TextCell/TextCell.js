import React from "react";
import PropTypes from "prop-types";
import style from "./TextCell.module.css";

function TextCell({ data }) {
	return <div className={style["cell"]}>{data.content}</div>;
}

TextCell.propTypes = {};

export default TextCell;
