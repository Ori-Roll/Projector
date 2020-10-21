import React from "react";
import { AppContext } from "../000_Old_ContextProvider/AppContextProvider";
import { initUser } from "../ServerProvider/config";

import style from "./Login.module.css";

import useInitAppState from "../ServerProvider/config";

function Loader() {
	return (
		<div>
			<div className={style["loading-app"]}>Loading App ...</div>
		</div>
	);
}

export default Loader;