import React, { useState } from "react";
import PropTypes from "prop-types";
import defaults from "../../../defaults/";
import style from "./ColumnsHead.module.css";

function ColumnsHead({ columns }) {
	return (
		<div className={style["tab-head"]}>
			{columns.map((column) => {
				return (
					<div className={style["item-container"]} key={`head-cont${column.key}`}>
						<div
							/* key={`${column.key}tab-head`} */
							className={style["tab-head-item"]}
							style={{
								width: column.width,
								backgroundColor: column.color ? column.color : {},
							}}>
							{column.dataId}
						</div>
						<div
							/* key={`${column.key}spacer`} */
							className={style["column-spacer-handle"]}
							style={{ width: column.spacer }}>
							&#x205E;
						</div>
					</div>
				);
			})}
		</div>
	);
}

ColumnsHead.propTypes = {};

export default ColumnsHead;
