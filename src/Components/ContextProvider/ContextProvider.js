import React, { useState, createContext } from "react";

export const PageContext = createContext();

function ContextProvider(props) {
	const [aaa, setAaa] = useState("BLA AAA");

	return (
		<PageContext.Provider
			value={{
				aaa: aaa,
			}}>
			{props.children}
		</PageContext.Provider>
	);
}

ContextProvider.propTypes = {};

export default ContextProvider;
