import React from "react";
import PropTypes from "prop-types";
import style from "./Task.module.css";

function CellWrapper({ column, createCell }) {
	return (
		<div
			key={column.id}
			className={style["cell-wrapper"]}
			style={
				column.isDragged
					? { width: column.width, marginRight: column.spacer, opacity: "20%" }
					: { width: column.width, marginRight: column.spacer }
			}>
			{createCell(column)}
		</div>
	);
}

CellWrapper.propTypes = {};

export default React.memo(CellWrapper, (prevProps, nextProps) => {
	let dontRender = false;
	if (nextProps.resizing && prevProps.column.width === nextProps.column.width) {
		dontRender = true;
	}
	if (nextProps.dragging && prevProps.column.spacer === nextProps.column.spacer) {
		dontRender = true;
	}
	return dontRender;
});
