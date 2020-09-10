import React from "react";
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
