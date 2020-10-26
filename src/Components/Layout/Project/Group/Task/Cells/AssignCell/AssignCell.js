import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import style from "./AssignCell.module.css";
import CellsStyle from "../CellsStyle.module.css";

import UserIcon from "../../../../../../../GlobalComponents/UserIcon/UserIcon";
import AssignedUsersMenu from "../../../../../../../GlobalComponents/AssignedUsersMenu/AssignedUsersMenu";

function AssignCell({ cell, doCellChange, assign, task, taskChange }) {
	const [assignedUsersMenuIsOn, setAssignedUsersMenuIsOn] = useState(false);

	function onAssignUsersToTask(users) {
		const changedTask = { ...task, assignedTo: users };
		taskChange(changedTask);
		//setCellAssignedTo([...cellAssignedTo, ...users]);
	}

	/* console.log(`%c ------cell render! content: ${cell.content}---------`, "color: green"); */
	/* useEffect(() => console.log("%c AssignCell MOUNT!", "color:red"), []); */

	const iconsSpacing = ()=> {
		if ((task.assignedTo.length > 2) && (task.assignedTo.length < 8)) return -8 - task.assignedTo.length;
		if (task.assignedTo.length >= 8) return -16;
		return -5;
	}

	function onAddAssignedClick() {
		setAssignedUsersMenuIsOn(true);
	}

	return (
		<div className={style["assign-cell"]}>
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
					assign={assign}
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

{
	/* <input
			className={style["assign-cell"]}
			value={assign[0].name}
			onChange={(e) => onInputChange(e.target.value)}
			onBlur={() => onBlur()}
		/> */
}
