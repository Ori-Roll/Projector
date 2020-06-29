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
	columnIsDragged,
	setColumnIsDragged,
}) {
	return (
		<div className={style["tab-head"]}>
			{columnIsDragged ? (
				<div style={{ width: 0 }}>
					<div
						className={style["floating-column"]}
						style={columnIsDragged ? { left: mouseXposition - 70 } : { display: "none" }}>
						-
					</div>
				</div>
			) : null}
			{columns.map((column) => {
				return (
					<div className={style["item-container"]} key={`head-cont${column.id}`}>
						<ColumnHead
							column={column}
							columnIsDragged={columnIsDragged}
							setColumnIsDragged={setColumnIsDragged}
							changeTabData={changeTabData}
						/>
						<ColumnHeadSpacer
							column={column}
							changeTabData={changeTabData}
							columnIsDragged={columnIsDragged}
						/>
					</div>
				);
			})}
		</div>
	);
}

ColumnsHeadWrapper.propTypes = {};

export default ColumnsHeadWrapper;
