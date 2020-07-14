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
					? { marginRight: column.spacer, opacity: "20%" }
					: { marginRight: column.spacer }
			}>
			<div style={{ width: column.width }}>{createCell(column)}</div>
		</div>
	);
}

CellWrapper.propTypes = {};

export default React.memo(CellWrapper, (prevProps, nextProps) => {
	if (nextProps.isDragged) {
		return prevProps.column.width === nextProps.column.width ? true : false;
	} else {
		return false;
	}
});
