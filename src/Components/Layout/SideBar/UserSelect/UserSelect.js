import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../000_Old_ContextProvider/AppContextProvider";
import { getCrappyServerData } from "../../../ServerProvider/old_index";

import { useDispatch } from "react-redux";
import { setUserDispatch } from "../../../redux/rootReducer";

import {
	db_loginUser,
	db_logoutUser,
	db_getLoggedInUser,
	db_updateUserDetails,
	db_updateUserPassword,
} from "./../../../ServerProvider/auth";
import style from "./UserSelect.module.css";

import UserIcon from "../../../../GlobalComponents/UserIcon/UserIcon";

let users;
getCrappyServerData("users").then((res) => (users = res));

function UserSelect() {
	const dispatch = useDispatch();
	const setUser = (user) => dispatch(setUserDispatch(user));

	const [usersMenu, setUsersManu] = useState(false);

	function onClick() {
		setUsersManu(!usersMenu);
	}

	async function changeToUser(userId) {
		getCrappyServerData(`users.${userId}`).then((res) => setUser(res));
		const user = await db_loginUser("johnJohn@gmail.com", "123456");
		const me = await db_getLoggedInUser();
		// console.log("me, ", me);
		setUsersManu(!usersMenu);
	}

	async function getLoggedInUserClick() {
		const currentUserRes = await db_getLoggedInUser();
		console.log("db_getLoggedInUser Click, ", currentUserRes);
	}

	async function updateUserDetailsClick() {
		const updateUserDetailsRes = await db_updateUserDetails({
			email: "oriroll@gmail.com",
			name: "Mr Ori the first",
		});
		console.log("db_updateUserDetails Click", updateUserDetailsRes);
	}
	async function updatePasswordClick() {
		const updateUserPasswordRes = await db_updateUserPassword("123456", "1234567");
		console.log("updatePasswordClick ", updateUserPasswordRes);
	}
	async function logoutClick() {
		const logoutUserRes = await db_logoutUser();
		// HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		console.log("logoutClick ", logoutUserRes);
		document.cookie = null; // TODO: Is this how to do this?
		console.log("document.cookie is ", document.cookie);
		setUser(null);
	}

	return (
		<div className={style["user-select"]}>
			<div>
				<button onClick={getLoggedInUserClick}>get LoggedIn User</button>
				<button onClick={updateUserDetailsClick}>update Users Details</button>
				<button onClick={updatePasswordClick}>updatePassword</button>
				<button onClick={logoutClick}>logout</button>
			</div>
			{/* <UserIcon userName={user.name} onClickCallback={onClick} userIcon={user.icon} /> */}
			{usersMenu ? (
				<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
					{Object.keys(users).map((key) => {
						return (
							<UserIcon
								key={key}
								userName={users[key].name}
								onClickCallback={() => changeToUser(users[key].id)}
								userIcon={users[key].icon}
							/>
						);
					})}
				</div>
			) : null}
		</div>
	);
}

UserSelect.propTypes = {};

export default UserSelect;
