import React from "react";
import PropTypes from "prop-types";
import style from "./Task.module.css";

function CellWrapper({ column, children }) {
	return (
		<div
			key={column.id}
			className={style["cell-wrapper"]}
			style={
				column.isDragged
					? { width: column.width, marginRight: "1px", opacity: "20%" }
					: { width: column.width, marginRight: "1px" }
			}>
			{children}
		</div>
	);
}

CellWrapper.propTypes = { column: PropTypes.object, createCell: PropTypes.func };

export default CellWrapper;

/* export default React.memo(CellWrapper, (prevProps, nextProps) => {
	let dontRender = false;
	if (nextProps.resizing && prevProps.column.width === nextProps.column.width) {
		dontRender = true;
	}
	if (nextProps.dragging && prevProps.column.spacer === nextProps.column.spacer) {
		dontRender = true;
	}
	return dontRender;
});
 */
