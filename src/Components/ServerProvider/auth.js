import axios from "axios";
import { getUserProjects } from "./projects";

axios.defaults.withCredentials = true;

async function registerUser(name, email, password) {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/v0/auth/register",
			{
				name: name,
				email: email,
				password: password,
				role: "user",
			},
			{ headers: { "Content-Type": "application/json" } }
		);
		document.cookie = `token: ${response.data.token}`;
		console.log("cookie ", document.cookie);
		return response;
	} catch (error) {
		if (error.response.data.error === "Duplicate field value enterd") {
			alert(
				"An error occurred. It is probably because a user with this email address already exists"
			);
		}
		console.error(error.response.data);
	}
}

async function loginUser(email, password) {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/v0/auth/login",
			{
				email: email,
				password: password,
			},
			{ headers: { "Content-Type": "application/json" } }
		);
		document.cookie = `token: ${response.data.token}`;
		console.log("cookie ", document.cookie);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

// TODO: Theres an issue here sometimes after register - fix this
async function logoutUser() {
	try {
		const response = await axios.get("http://localhost:5000/api/v0/auth/logout");
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

async function getLoggedInUser() {
	try {
		const response = await axios.get("http://localhost:5000/api/v0/auth/me");
		if (response) return response.data;
	} catch (error) {
		console.error("error is ", error.response);
	}
}

async function forgotUserPassword(email) {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/v0/auth/forgotpassword",
			{
				email: email,
			},
			{ headers: { "Content-Type": "application/json" } }
		);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

async function resetUserPassword(resetPasswordToken, newPassword) {
	// resetPasswordToken was sent by mail
	try {
		console.log(`http://localhost:5000/api/v0/auth/resetpassword/${resetPasswordToken}`);
		const response = await axios.put(
			`http://localhost:5000/api/v0/auth/resetpassword/${resetPasswordToken}`,
			{
				password: newPassword,
			},
			{ headers: { "Content-Type": "application/json" } }
		);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

async function updateUserDetails(newDetails) {
	try {
		const response = await axios.put(
			"http://localhost:5000/api/v0/auth/updatedetails",
			newDetails,
			{ headers: { "Content-Type": "application/json" } }
		);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

async function uploadUserPhoto(photo) {
	var formData = new FormData();
	formData.append("image", photo);

	try {
		const response = await axios.put(
			"http://localhost:5000/api/v0/auth/userPhotoUpload",
			formData,
			{ headers: { "Content-Type": "multipart/form-data" } }
		);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

async function updateUserPassword(currentPassword, newPassword) {
	try {
		const response = await axios.put(
			"http://localhost:5000/api/v0/auth/updatepassword",
			{
				currentPassword: currentPassword,
				newPassword: newPassword,
			},
			{ headers: { "Content-Type": "application/json" } }
		);
		return response.data;
	} catch (error) {
		console.error(error.response.data);
	}
}

export {
	registerUser,
	loginUser,
	logoutUser,
	getLoggedInUser,
	forgotUserPassword,
	resetUserPassword,
	updateUserDetails,
	updateUserPassword,
	uploadUserPhoto,
};
