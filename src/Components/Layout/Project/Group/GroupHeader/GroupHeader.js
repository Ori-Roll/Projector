import React, { useEffect } from "react";
import PropTypes from "prop-types";
import GroupArrow from "./GroupArrow/GroupArrow";
import style from "./GroupHeader.module.css";
import AddToGroup from "./AddToGroup/AddToGroup";

function GroupHeader({ groupIsOpen, setGroupIsOpen, group, groupIndex }) {

	const onHeaderClick = () => {
		setGroupIsOpen(!groupIsOpen);
	};

	return (
		<div className={style["group-header-wrapper"]}>
			<div
				className={style["group-header"]}
				style={{ fontWeight: groupIsOpen ? "600" : "400" }}
				onClick={onHeaderClick}>
				<GroupArrow groupIsOpen={groupIsOpen} setGroupIsOpen={setGroupIsOpen} />
				{group.title}
			</div>
			<div className={style["group-header-right-menu"]}>
				<AddToGroup group={group} groupIndex={groupIndex} />
			</div>
		</div>
	);
}

GroupHeader.propTypes = {};

export default GroupHeader;
