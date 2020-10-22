import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import _, { find } from "lodash";

import { db_getApprovingUsers } from "../../Components/ServerProvider/auth";

import UserIcon from "../UserIcon/UserIcon";
import UsersListItem from "../UsersListItem/UsersListItem";
import UsersSearchBox from "../UsersSearchBox/UsersSearchBox";
import Loader from "../Loader/Loader"

import style from "./AssignedUsersMenu.module.css";

function AssignedUsersMenu({ assign, setAssignedUsersMenuIsOn, onAssignUsersCallback }) {
	const user = useSelector((state) => state?.user);
	const [selectedUsers, setSelectedUsers] = useState([...assign]);
	const [knownUsersLoaded, setKnownUsersLoaded] = useState(false);
	const [allKnownUsers, setAllKnownUsers] = useState([]);

	useEffect(() => {
		async function initGetApprovingUsers() {
			try {
				const approvingUsersRes = await db_getApprovingUsers();
				let combinedUsers = approvingUsersRes.approvingUsers.concat(
					approvingUsersRes.user.knownUsers
				);
				combinedUsers = _.uniqBy(combinedUsers, "_id");
				setAllKnownUsers(combinedUsers);
				console.log("combinedUsers  ", combinedUsers);
			} catch (error) {
				console.error("cant get known users", error);
			}
			setKnownUsersLoaded(true);
		}
		initGetApprovingUsers();
	}, []);

	function knownUsersDisplay() {
		if (!knownUsersLoaded) {
			return <Loader message={"Loading known users"}/>;
		}
		if (allKnownUsers.length !== 0) {
			const usersToShow = allKnownUsers.filter(
				(user) => selectedUsers.find((selectedUser) => selectedUser._id === user._id) === undefined
			);
			return (
				<ul className={style["user-suggestion-ul"]}>
					{usersToShow.map((user) => {
						return <UsersListItem key={user._id} user={user} onClickCallback={onAddUser} />;
					})}
				</ul>
			);
		}
		return (
			<div >
				<h3>No known users.</h3>
				<p>You can try searching for more users</p>
			</div>
		);
	}

	function onDoneClick() {
		onAssignUsersCallback(selectedUsers);
		setTimeout(() => setAssignedUsersMenuIsOn(false), 1000);
	}

	function onModalClick() {
		setAssignedUsersMenuIsOn(false);
	}

	function onAddUser(e, user) {
		console.log("on add user - user is : ", user);
		if (selectedUsers.find((selectedUser) => selectedUser._id === user._id) === undefined) {
			setSelectedUsers((selectedUsers) => [...selectedUsers, user]);
		}
	}

	function onRemoveUser(user) {
		console.log("remove");
		setSelectedUsers((selectedUsers) => {
			const newSelectedUsers = [...selectedUsers];
			const removedUserIndex = newSelectedUsers.findIndex(
				(selectedUser) => user._id === selectedUser._id
			);
			newSelectedUsers.splice(removedUserIndex, 1);
			console.log("newSelectedUsers ", newSelectedUsers);
			return newSelectedUsers;
		});
	}

	return (
		<div className={style["modal"]} onClick={onModalClick}>
			<form
				className={style["form-wrapper"]}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<div>
					<h1>Add someone to this task</h1>
						<div className={style["user-suggestion-wrapper"]}>
						{knownUsersDisplay()}
						</div>
				</div>
				<div>
					<h2>Search for more users</h2>
					<UsersSearchBox
						onAddUserCallback={(user) => onAddUser(null, user)}
						lable={true}
						ignoreUsers={selectedUsers}
					/>
				</div>

				<div>
					<h1>Selected Users</h1>
					<ul className={style["selected-users-ul"]}>
						{selectedUsers.map((user) => (
							<li key={user._id}>
								<UserIcon
									userName={user.name}
									userPhoto={user.photo}
									userId={user._id}
									removable={true}
									onRemoveCallback={onRemoveUser}
								/>
							</li>
						))}
					</ul>
				</div>
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
