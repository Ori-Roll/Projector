import React from "react";
import PropTypes from "prop-types";
import style from "./TabHead.module.css";

function TabHead({ columns }) {
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
							draggable='true'
							onDragStart={(e) => onDragStart(e, column.key)}>
							&#x205E;&#x205E;
						</div>
					</div>
				);
			})}
		</div>
	);
}

TabHead.propTypes = {};

export default TabHead;
