import React, { useEffect } from "react";
import PropTypes from "prop-types";
import defaults from "../../../defaults";
import ColumnHead from "./ColumnHead/ColumnHead";
import ColumnHeadSpacer from "./ColumnHead/ColumnHeadSpacer";
import style from "./ColumnsHeadWrapper.module.css";

function ColumnsHeadWrapper({
	tabData,
	changeTabData,
	draggedColumn,
	setDraggedColumn,
	setResizedColumn,
}) {
	useEffect(() => {
		console.log("%c ColumnHeadWrapper Mount!", "font-weight: bold; font-size: 15px; color: red;");
	}, []);

	return (
		<div className={style["column-head-wrapper"]}>
			{tabData.columns.map((column) => {
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
							tabData={tabData}
							changeTabData={changeTabData}
							draggedColumn={draggedColumn}
							setResizedColumn={setResizedColumn}
						/>
					</div>
				);
			})}
		</div>
	);
}

ColumnsHeadWrapper.propTypes = {};

export default ColumnsHeadWrapper;
