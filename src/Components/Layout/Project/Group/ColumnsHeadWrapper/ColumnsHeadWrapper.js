import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { ResizableBox } from "react-resizable";

import ColumnHead from "./ColumnHead/ColumnHead";
import ColumnHeadSpacer from "./ColumnHead/ColumnHeadSpacer";

import { resizeColumnDispatch } from "../../../../redux/rootReducer";

import style from "./ColumnsHeadWrapper.module.css";

function ColumnsHeadWrapper({
	columns,
	groupIndex,
	/* changeGroupData, */
	/* setResizedColumn, */
}) {
	const dispatch = useDispatch();

	const resizeColumn = (groupIndex, columnIndex, width) =>
		dispatch(resizeColumnDispatch(groupIndex, columnIndex, width));

	useEffect(() => {
		/* console.log("%c ColumnHeadWrapper Mount!", "font-weight: bold; font-size: 15px; color: red;"); */
	}, []);

	function onResize(data, columnIndex) {
		/* console.log(`resized data`, data.size.width); */
		resizeColumn(groupIndex, columnIndex, data.size.width);
	}

	return (
		<div className={style["column-head-wrapper"]}>
			{columns.map((column, columnIndex) => {
				return (
					<div className={style["item-container"]} key={column._id}>
						<ResizableBox
							width={column.width}
							height={40}
							minConstraints={[column.minWidth]}
							maxConstraints={[column.maxWidth]}
							onResize={(e, data) => onResize(data, columnIndex)}
							/* handle={
							
							} */
							resizeHandles={["e"]}>
							<ColumnHead
								column={column}
								/* changeGroupData={changeGroupData} */
							/>
						</ResizableBox>
						<ColumnHeadSpacer column={column} />
					</div>
				);
			})}
		</div>
	);
}

ColumnsHeadWrapper.propTypes = {};

export default ColumnsHeadWrapper;
