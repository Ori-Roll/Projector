import { getLoggedInUser } from "./auth";

async function initUser() {
	let user = null;
	console.log("START document.cookie ", document.cookie);
	if (document.cookie && document.cookie.startsWith("token")) {
		try {
			const res = await getLoggedInUser();
			user = res.data;
		} catch (error) {
			// TODO: This needs to be addressed
			user = null;
			console.log("No user with that token");
		}
	}
	return user;
}

export { initUser };
