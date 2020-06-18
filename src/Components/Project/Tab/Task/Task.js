import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import style from "./Task.module.css";

const Task = ({ task, columns }) => {
	return (
		<div className={style["task"]}>
			{columns.map((column) => {
				return (
					<div key={`${column.key}_${task.key}`} className={style["item-container"]}>
						<div className={style["data-item"]} style={{ width: column.width }}>
							{task[column.dataId].data}
						</div>
						<div className={style["column-spacer"]} style={{ width: column.spacer }}></div>
					</div>
				);
			})}
			{/* <div className={styles["project-tab-content"]} style={{ width: thisWidth }}></div>
			<div className={styles["tab-size-handle"]} /> */}
		</div>
	);
};

Task.propTypes = {};

export default Task;
