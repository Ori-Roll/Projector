import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../ContextProviders/AppContextProvider";
import { setCrappyServerData, getCrappyServerData } from "../../../ServerProvider";
import {
	registerUser,
	loginUser,
	logoutUser,
	getLoggedInUser,
	forgotUserPassword,
	resetUserPassword,
	updateUserDetails,
	updateUserPassword,
} from "./../../../ServerProvider/auth";
import style from "./UserSelect.module.css";

import UserIcon from "../../../misc/GlobalComponents/UserIcon/UserIcon";

let users;
getCrappyServerData("users").then((res) => (users = res));

function UserSelect() {
	const { currentUser, setCurrentUser } = useContext(AppContext);

	const [usersMenu, setUsersManu] = useState(false);

	function onClick() {
		setUsersManu(!usersMenu);
	}

	async function changeToUser(userId) {
		getCrappyServerData(`users.${userId}`).then((res) => setCurrentUser(res));
		const user = await loginUser("johnJohn@gmail.com", "123456");
		const me = await getLoggedInUser();
		// console.log("me, ", me);
		setUsersManu(!usersMenu);
	}

	async function registerUserClick() {
		const registeredUserRes = await registerUser("ori", "oriroll9@gmail.com", "123456");
		console.log("regiserUserClick Click ", registeredUserRes);
	}

	async function loginUserClick() {
		try {
			const loggedInUserRes = await loginUser("oriroll@gmail.com", "1234567");
			if (loggedInUserRes) setCurrentUser(loggedInUserRes.user);
			console.log("loginUser Click ", loggedInUserRes);
		} catch (error) {
			console.error(error);
		}
	}

	async function getLoggedInUserClick() {
		const currentUserRes = await getLoggedInUser();
		console.log("getLoggedInUser Click, ", currentUserRes);
	}

	async function forgotPasswordClick() {
		const forgotPasswordRes = await forgotUserPassword("oriroll@gmail.com");
		if (forgotPasswordRes)
			alert(
				"An email was sent to you. Please follow the instructions on the email to reset your password."
			);
		console.log("forgotPassword Click, ", forgotPasswordRes);
	}
	async function resetPasswordClick() {
		const resetUserPasswordRes = await resetUserPassword(
			"df5b9096c7d37cfbfd53b2a9717d47cf851ecf5d",
			"123456"
		);
		console.log("resetPassword Click ", resetUserPasswordRes);
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
		console.log("logoutClick ", logoutUserRes);
	}

	return (
		<div className={style["user-select"]}>
			<UserIcon userName={currentUser.name} onClickCallback={onClick} userIcon={currentUser.icon} />
			{usersMenu ? (
				<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
					<div>
						<button onClick={registerUserClick}>registerUser</button>
						<button onClick={loginUserClick}>loginUser</button>
						<button onClick={getLoggedInUserClick}>getLoggedInUser</button>
						<button onClick={forgotPasswordClick}>forgotPassword</button>
						<button onClick={resetPasswordClick}>resetPassword</button>
						<button onClick={updateUserDetailsClick}>updateUserDetails</button>
						<button onClick={updatePasswordClick}>updatePassword</button>
						<button onClick={logoutClick}>logout</button>
					</div>
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
