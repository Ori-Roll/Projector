import React, { useState } from "react";
import PropTypes from "prop-types";
import defaults from "../../../defaults/";
import style from "./ColumnsHead.module.css";

function ColumnsHead({ columns, setTabData }) {
	function onDragStart(e, columnKey) {
		/* e.preventDefault(); */
		console.log(columnKey);
	}

	return (
		<div className={style["tab-head"]}>
			{columns.map((column) => {
				return (
					<div className={style["item-container"]} key={`head-cont${column.key}`}>
						<div
							/* key={`${column.key}tab-head`} */
							className={style["tab-head-item"]}
							style={{ width: column.width }}>
							{column.dataId}
						</div>
						<div
							/* key={`${column.key}spacer`} */
							className={style["column-spacer-handle"]}
							style={{ width: column.spacer }}
							onMouseOver={() => {
								setTabData((oldData) => {
									let newData = { ...oldData };
									console.log(newData.columns);
									newData.columns.find((colItem) => colItem.key === column.key).spacer =
										defaults.SPACER_WIDTH_ON_HOVER;
									return newData;
								});
							}}
							onMouseLeave={() => {
								setTabData((oldData) => {
									let newData = { ...oldData };
									console.log(newData.columns);
									newData.columns.find((colItem) => colItem.key === column.key).spacer =
										defaults.SPACER_WIDTH;
									return newData;
								});
							}}
							draggable='true'
							onDragStart={(e) => onDragStart(e, column.key)}>
							&#x205E;
						</div>
					</div>
				);
			})}
		</div>
	);
}

ColumnsHead.propTypes = {};

export default ColumnsHead;
