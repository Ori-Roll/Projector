import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import defaults from "../../../defaults";
import ColumnHead from "./ColumnHead/ColumnHead";
import style from "./ColumnsHeadWrapper.module.css";

function ColumnsHeadWrapper({ columns }) {
	return (
		<div className={style["tab-head"]}>
			{columns.map((column) => {
				return (
					<div className={style["item-container"]} key={`head-cont${column.id}`}>
						<ColumnHead column={column} />
						<div className={style["column-spacer-handle"]} style={{ width: column.spacer }}>
							&#x205E;
						</div>
					</div>
				);
			})}
		</div>
	);
}

ColumnsHeadWrapper.propTypes = {};

export default ColumnsHeadWrapper;
