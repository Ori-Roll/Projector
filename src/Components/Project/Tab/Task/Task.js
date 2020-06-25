import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CellOfType } from "./Cells/CellTypes/CellTypes";
import Spacer from "./Spacer/Spacer";
import style from "./Task.module.css";

function Task({ task, columns }) {
	function createCell(column) {
		return task[column.id]
			? CellOfType[column.type](task[column.id], column)
			: CellOfType[column.type](null, column);
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
