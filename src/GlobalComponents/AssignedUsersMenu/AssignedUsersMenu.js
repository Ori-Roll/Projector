import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { db_getUsersByEmailQuery } from "../../Components/ServerProvider/users";

import UserIcon from "../UserIcon/UserIcon";
import UsersSearchBox from "../UsersSearchBox/UsersSearchBox";

import style from "./AssignedUsersMenu.module.css";

function AssignedUsersMenu({ assign, setAssignedUsersMenuIsOn, onAssignUsersCallback }) {
	const [selectedUsers, setSelectedUsers] = useState([]);

	function onDoneClick() {
		onAssignUsersCallback(selectedUsers);
		setTimeout(() => setAssignedUsersMenuIsOn(false), 1000);
	}

	function onModalClick() {
		setAssignedUsersMenuIsOn(false);
	}

	function onAddUser(user) {
		if (selectedUsers.find((selectedUser) => selectedUser._id === user._id) === undefined) {
			setSelectedUsers((selectedUsers) => [...selectedUsers, user]);
		}
	}

	return (
		<div className={style["modal"]} onClick={onModalClick}>
			<form
				className={style["form-wrapper"]}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<UsersSearchBox onAddUserCallback={(user) => onAddUser(user)} lable={true} />
				<ul className={style["selected-users-ul"]}>
					{selectedUsers.map((user) => (
						<li key={user._id}>
							<UserIcon userName={user.name} userPhoto={user.photo} userId={user._id} />
						</li>
					))}
				</ul>
				{selectedUsers.length !== 0 && (
					<button
						className={style["done-btn"]}
						onClick={(e) => {
							e.preventDefault();
							onDoneClick();
						}}>
						Ok
					</button>
				)}
			</form>
		</div>
	);
}

AssignedUsersMenu.propTypes = {};

export default AssignedUsersMenu;
