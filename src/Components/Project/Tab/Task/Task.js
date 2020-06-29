import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CellOfType } from "./Cells/CellTypes/CellTypes";
import Spacer from "./Spacer/Spacer";
import style from "./Task.module.css";

function Task({ task, columns }) {
	function createCell(column = () => console.error("no column for cell")) {
		if (!column.type) throw new Error("No column.type for cell");
		/* console.log("column", column);
		console.log("task", task); */
		return CellOfType[column.type](task[column.id], column);
	}
	return (
		<div className={style["task"]} key={Math.random()}>
			{columns.map((column) => {
				return (
					<div key={Math.random()} className={style["cell-holder"]}>
						<div
							style={
								column.isDragged
									? { width: column.width, transform: "scale(0.90, 0.90)", opacity: "60%" }
									: { width: column.width }
							}>
							{createCell(column)}
						</div>
						<Spacer column={column} />
					</div>
				);
			})}
		</div>
	);
}

Task.propTypes = {};

export default Task;
