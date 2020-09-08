import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ColumnHead from "./ColumnHead/ColumnHead";
import ColumnHeadSpacer from "./ColumnHead/ColumnHeadSpacer";
import style from "./ColumnsHeadWrapper.module.css";

function ColumnsHeadWrapper({
	columns,
	/* changeGroupData, */
	/* setResizedColumn, */
}) {
	useEffect(() => {
		/* console.log("%c ColumnHeadWrapper Mount!", "font-weight: bold; font-size: 15px; color: red;"); */
	}, []);

	return (
		<div className={style["column-head-wrapper"]}>
			{columns.map((column) => {
				console.log(column);
				return (
					<div className={style["item-container"]} key={column._id}>
						{console.log("COLUMN!")}
						<ColumnHead
							column={column}
							/* changeGroupData={changeGroupData} */
						/>
						<ColumnHeadSpacer
							column={column}
							/* changeGroupData={changeGroupData}
							setResizedColumn={setResizedColumn} */
						/>
					</div>
				);
			})}
		</div>
	);
}

ColumnsHeadWrapper.propTypes = {};

export default ColumnsHeadWrapper;
