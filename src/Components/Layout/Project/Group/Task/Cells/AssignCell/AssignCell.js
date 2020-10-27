import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import style from "./AssignCell.module.css";
import CellsStyle from "../CellsStyle.module.css";

import UserIcon from "../../../../../../../GlobalComponents/UserIcon/UserIcon";
import AssignedUsersMenu from "../../../../../../../GlobalComponents/AssignedUsersMenu/AssignedUsersMenu";

function AssignCell({ cell, doCellChange, task, taskChange }) {
	const [assignedUsersMenuIsOn, setAssignedUsersMenuIsOn] = useState(false);

	

	function onAssignUsersToTask(users) {
		const changedTask = { ...task, assignedTo: users };
		taskChange(changedTask);
		//setCellAssignedTo([...cellAssignedTo, ...users]);
	}

	const iconsSpacing = ()=> {
		const widthX = wrapperRef.current ? Math.floor(wrapperRef.current.offsetWidth/80)**2 : 2;
		if ((task.assignedTo.length >= 0) && (task.assignedTo.length < 8)) return -8 - task.assignedTo.length + widthX;
		return -16 + widthX;
	}

	function onAddAssignedClick() {
		setAssignedUsersMenuIsOn(true);
	}

	const wrapperRef = useRef();

	

	return (
		<div className={style["assign-cell"]} ref={wrapperRef}>
			<div className={style["assigned-users-wrapper"]}>
				{task.assignedTo.map((user) => (
					<div key={user._id} className={style["user-icon-wrapper"]} style={{marginRight: `${iconsSpacing()}px`}}>
						<UserIcon
							key={user._id}
							userName={user.name}
							userId={user._id}
							userPhoto={user.photo}
						/>
					</div>
				))}
			</div>

			<button className={style["add-assigned-btn"]} onClick={onAddAssignedClick}>
				&#43;
			</button>

			{assignedUsersMenuIsOn && (
				<AssignedUsersMenu
					assign={task.assignedTo}
					setAssignedUsersMenuIsOn={setAssignedUsersMenuIsOn}
					onAssignUsersCallback={onAssignUsersToTask}
				/>
			)}
		</div>
	);
}

AssignCell.propTypes = {};

export default AssignCell;

/* export default React.memo(AssignCell, (prevProps, nextProps) => {
	//if (prevProps.task.assignedTo === [] && nextProps.task.assignedTo === []) return true;
	return prevProps.task.assignedTo !== nextProps.task.assignedTo ? true : false;
}); */

