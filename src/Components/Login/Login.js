import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./Login.module.css";

import {
	registerUser,
	loginUser,
	getLoggedInUser,
	forgotUserPassword,
	resetUserPassword,
} from "../ServerProvider/auth";
import { AppContext } from "../ContextProviders/AppContextProvider";

function Login() {
	const { currentUser, setCurrentUser, setAppInitState } = useContext(AppContext);
	const [email, setEmail] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [password, setPassword] = useState("");

	function onEmailChange(emailVal) {
		let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (re.test(emailVal)) {
			setIsValidEmail(true);
		} else {
			setIsValidEmail(false);
		}
		setEmail(emailVal);
	}

	async function registerUserClick() {
		try {
			const registeredUserRes = await registerUser("ori", "david2@gmail.com", "123456");
			console.log("regiserUserClick Click ", registeredUserRes);
			if (registeredUserRes) {
				try {
					const user = await getLoggedInUser();
					setCurrentUser(user);
					console.log("user isss", user);
					setAppInitState("loggedin");
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function loginUserClick(e) {
		e.preventDefault();
		try {
			console.log("loginUserClick!");
			const loggedInUserRes = await loginUser(email, password);
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
		<div className={style["login-page"]}>
			<div className={style["color-top"]} />
			<form>
				<div className={style["input-group"]}>
					<label htmlFor='email-input'>email:</label>
					<input
						id='email-input'
						type='email'
						name='email'
						placeholder='User email here'
						value={email}
						onChange={(e) => onEmailChange(e.target.value)}
					/>
					<p className={style["input-warning"]}>
						{isValidEmail || email === "" ? " " : "Please enter a valid email"}
					</p>
				</div>
				<div className={style["input-group"]}>
					<label htmlFor='password-input'>password:</label>
					<input
						id='password-input'
						type='password'
						name='password'
						placeholder='User password here'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className={style["forgot-password-btn"]} onClick={forgotPasswordClick}>
						Forgot your password ?
					</button>
				</div>
				<button
					className={
						isValidEmail && password !== "" ? style["login-btn"] : style["login-btn-disabled"]
					}
					onClick={(e) => loginUserClick(e)}>
					Login
				</button>
			</form>

			<button onClick={resetPasswordClick}>resetPassword</button>
			<button onClick={registerUserClick}>registerUser</button>
		</div>
	);
}

Login.propTypes = {};

export default Login;
