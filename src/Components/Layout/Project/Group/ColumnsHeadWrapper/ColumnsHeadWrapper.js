import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ColumnHead from "./ColumnHead/ColumnHead";
import ColumnHeadSpacer from "./ColumnHead/ColumnHeadSpacer";
import style from "./ColumnsHeadWrapper.module.css";

function ColumnsHeadWrapper({
	tabData,
	changeGroupData,
	draggedColumn,
	setDraggedColumn,
	setResizedColumn,
}) {
	useEffect(() => {
		/* console.log("%c ColumnHeadWrapper Mount!", "font-weight: bold; font-size: 15px; color: red;"); */
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
							changeGroupData={changeGroupData}
						/>
						<ColumnHeadSpacer
							column={column}
							tabData={tabData}
							changeGroupData={changeGroupData}
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
