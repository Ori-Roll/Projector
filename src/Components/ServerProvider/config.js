import { getLoggedInUser } from "./auth";

async function initUser() {
	let user = null;
	console.log("START document.cookie ", document.cookie);
	if (document.cookie && document.cookie.startsWith("token")) {
		try {
			console.log("getLoggedInUser");
			user = await getLoggedInUser();
			console.log("setCurrentUser", user);
		} catch (error) {
			// TODO: This needs to be addressed
			user = null;
			console.log("No user with that token");
		}
	}
	return user;
}

export { initUser };
