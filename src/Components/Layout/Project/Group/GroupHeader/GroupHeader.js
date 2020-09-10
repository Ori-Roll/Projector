import React, { useEffect } from "react";
import PropTypes from "prop-types";
import GroupArrow from "./GroupArrow/GroupArrow";
import style from "./GroupHeader.module.css";

function GroupHeader({ groupIsOpen, setGroupIsOpen, group }) {
	useEffect(() => {
		/* console.log("%c GroupHeader Mount!", "font-weight: bold; font-size: 15px; color: red;"); */
	}, []);

	const onHeaderClick = () => {
		setGroupIsOpen(!groupIsOpen);
	};

	return (
		<div className={style["group-header-wrapper"]}>
			<GroupArrow groupIsOpen={groupIsOpen} setGroupIsOpen={setGroupIsOpen} />
			<div
				className={style["group-header"]}
				style={{ fontWeight: groupIsOpen ? "600" : "400" }}
				onClick={onHeaderClick}>
				{group.title}
			</div>
		</div>
	);
}

GroupHeader.propTypes = {};

export default GroupHeader;
