import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { CellOfType, TextCell, NumberCell } from "./Cells/CellTypes/CellTypes";
import style from "./Task.module.css";

function Task({ task, columns }) {
	return (
		<div className={style["task"]} key={Math.random()}>
			{columns.map((column) => {
				return (
					<div key={Math.random()} className={style["cell-holder"]}>
						<div key={Math.random()} style={{ width: column.width }}>
							{/*                IS THIS CLEAR?                   */}
							{[CellOfType[column.type](task[column.dataId])]}
						</div>
						<div
							key={Math.random()}
							className={style["column-spacer"]}
							style={{ width: column.spacer }}></div>
					</div>
				);
			})}
		</div>
	);
}

Task.propTypes = {};

export default Task;
