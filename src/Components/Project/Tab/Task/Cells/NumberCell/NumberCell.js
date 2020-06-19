import React from "react";
import PropTypes from "prop-types";
import style from "./NumberCell.module.css";

function NumberCell({ data }) {
	return <div className={style["cell"]}>number: {data.content}</div>;
}

NumberCell.propTypes = {};

export default NumberCell;
