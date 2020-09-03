import React, { useContext } from "react";
import PropTypes from "prop-types";
import style from "./Login.module.css";

import {
	registerUser,
	loginUser,
	forgotUserPassword,
	resetUserPassword,
} from "../ServerProvider/auth";
import { AppContext } from "../ContextProviders/AppContextProvider";

function Login(props) {
	const { setCurrentUser, setAppInitState } = useContext(AppContext);

	async function registerUserClick() {
		const registeredUserRes = await registerUser("ori", "oriroll9@gmail.com", "123456");
		console.log("regiserUserClick Click ", registeredUserRes);
	}

	async function loginUserClick() {
		try {
			const loggedInUserRes = await loginUser("oriroll@gmail.com", "1234567");
			if (loggedInUserRes) {
				setCurrentUser(loggedInUserRes.user);
				console.log("user isss", loggedInUserRes);
				setAppInitState("loggedin");
			}
			console.log("loginUser Click ", loggedInUserRes);
		} catch (error) {
			console.error(error);
		}
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
	return (
		<div className={style["welcome-page"]}>
			<button onClick={registerUserClick}>registerUser</button>
			<button onClick={loginUserClick}>loginUser</button>
			<button onClick={forgotPasswordClick}>forgotPassword</button>
			<button onClick={resetPasswordClick}>resetPassword</button>
		</div>
	);
}

Login.propTypes = {};

export default Login;
