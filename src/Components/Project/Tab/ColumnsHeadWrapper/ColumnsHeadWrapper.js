import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import defaults from "../../../defaults";
import ColumnHead from "./ColumnHead/ColumnHead";
import ColumnHeadSpacer from "./ColumnHead/ColumnHeadSpacer";
import style from "./ColumnsHeadWrapper.module.css";

function ColumnsHeadWrapper({
	columns,
	changeTabData,
	mouseXposition,
	draggedColumn,
	setDraggedColumn,
}) {
	return (
		<div className={style["tab-head"]}>
			{draggedColumn ? (
				<div style={{ width: 0 }}>
					<div className={style["floating-column"]} style={{ left: mouseXposition - 70 }}>
						-
					</div>
				</div>
			) : null}
			{columns.map((column) => {
				return (
					<div className={style["item-container"]} key={`head-cont${column.id}`}>
						<ColumnHead
							column={column}
							draggedColumn={draggedColumn}
							setDraggedColumn={setDraggedColumn}
							changeTabData={changeTabData}
						/>
						<ColumnHeadSpacer
							column={column}
							changeTabData={changeTabData}
							draggedColumn={draggedColumn}
						/>
					</div>
				);
			})}
		</div>
	);
}

ColumnsHeadWrapper.propTypes = {};

export default ColumnsHeadWrapper;
