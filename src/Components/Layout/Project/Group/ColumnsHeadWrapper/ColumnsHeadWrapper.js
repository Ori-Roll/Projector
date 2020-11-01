import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import {db_editColumn} from "../../../../ServerProvider/columns";

import { ResizableBox } from "react-resizable";

import ColumnHead from "./ColumnHead/ColumnHead";


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

	function onResize(data, columnIndex) {
		resizeColumn(groupIndex, columnIndex, data.size.width);
	}

	async function onResizeStop(data, column){
		const editedColumn = {...column, width: data.size.width}
		try {
			const resColumn = await db_editColumn(editedColumn);
			console.log(resColumn);
		} catch(error) {
			console.error(error)
		}
	}

	return (
		<div className={style["column-head-wrapper"]}>
			{columns.map((column, columnIndex) => {
				return (
						<ResizableBox
							key={column._id}
							className={style["item-container"]}
							handle={<div className={style["resize-handle"]}/>}
							width={column.width ? column.width : 150}
							height={40}
							minConstraints={[column.minWidth]}
							maxConstraints={[column.maxWidth]}
							onResize={(e, data) => onResize(data, columnIndex)}
							onResizeStop={(e, data)=>onResizeStop(data, column)}
							resizeHandles={["e"]}>
							<ColumnHead
								column={column}
								columnIndex={columnIndex}
								groupIndex={groupIndex}
							/>
						</ResizableBox>
				);
			})}
		</div>
	);
}

ColumnsHeadWrapper.propTypes = {};

export default ColumnsHeadWrapper;
