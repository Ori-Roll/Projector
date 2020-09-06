import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../ContextProviders/AppContextProvider";
import { initUser } from "../ServerProvider/config";

import style from "./Login.module.css";

import useInitAppState from "../ServerProvider/config";

function Loader(props) {
	return (
		<div>
			<div className={style["loading-app"]}>Loading App ...</div>
		</div>
	);
}

Loader.propTypes = {};

export default Loader;

/* 	const { currentUser, setCurrentUser } = useContext(AppContext);
	const { appInitState, setAppInitState } = useContext(AppContext);
 */
/* 	async function initApp() {
		const user = await initUser();
		if (user) {
			setCurrentUser(user);
		}
	} */

/* 	useEffect(() => {
		initApp();
	}, []);
 */
