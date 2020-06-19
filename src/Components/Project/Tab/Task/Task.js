import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import style from "./Task.module.css";
import TextCell from "./Cells/TextCell/TextCell";
import NumberCell from "./Cells/NumberCell/NumberCell";

const Task = ({ task, columns }) => {
	const cellComponentTypes = {
		text: (data) => <TextCell data={data} />,
		number: (data) => <NumberCell data={data} />,
	};

	return (
		<div className={style["task"]}>
			{columns.map((column) => {
				return (
					<>
						<div
							key={`${column.key}_${task.key}`}
							className={style["cell-holder"]}
							style={{ width: column.width }}>
							{/* <div className={style["data-item"]} style={{ width: column.width }}>
							{task[column.dataId].data}
						</div> */}
							{[cellComponentTypes[column.type](task[column.dataId])]}
						</div>
						<div className={style["column-spacer"]} style={{ width: column.spacer }}></div>
					</>
				);
			})}
		</div>
	);
};

Task.propTypes = {};

export default Task;
