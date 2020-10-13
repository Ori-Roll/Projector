import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../000_Old_ContextProvider/AppContextProvider";
import { getCrappyServerData } from "../../../ServerProvider";

import { useDispatch } from "react-redux";
import { setUserDispatch } from "../../../redux/rootReducer";

import {
	loginUser,
	logoutUser,
	getLoggedInUser,
	updateUserDetails,
	updateUserPassword,
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
		const user = await loginUser("johnJohn@gmail.com", "123456");
		const me = await getLoggedInUser();
		// console.log("me, ", me);
		setUsersManu(!usersMenu);
	}

	async function getLoggedInUserClick() {
		const currentUserRes = await getLoggedInUser();
		console.log("getLoggedInUser Click, ", currentUserRes);
	}

	async function updateUserDetailsClick() {
		const updateUserDetailsRes = await updateUserDetails({
			email: "oriroll@gmail.com",
			name: "Mr Ori the first",
		});
		console.log("updateUserDetails Click", updateUserDetailsRes);
	}
	async function updatePasswordClick() {
		const updateUserPasswordRes = await updateUserPassword("123456", "1234567");
		console.log("updatePasswordClick ", updateUserPasswordRes);
	}
	async function logoutClick() {
		const logoutUserRes = await logoutUser();
		// HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		console.log("logoutClick ", logoutUserRes);
		document.cookie = null; // TODO: Is this how to do this?
		console.log("document.cookie is ", document.cookie);
		setUser(null);
	}

	return (
		<div className={style["user-select"]}>
			<div>
				<button onClick={getLoggedInUserClick}>getLoggedInUser</button>
				<button onClick={updateUserDetailsClick}>updateUserDetails</button>
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
