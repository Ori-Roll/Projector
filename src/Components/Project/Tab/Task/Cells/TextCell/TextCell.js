import React from "react";
import PropTypes from "prop-types";
import style from "./TextCell.module.css";

function TextCell({ cellData = { content: "" } }) {
	console.log(cellData);
	return <div className={style["cell"]}>{cellData.content}</div>;
}

TextCell.propTypes = {};

export default TextCell;
