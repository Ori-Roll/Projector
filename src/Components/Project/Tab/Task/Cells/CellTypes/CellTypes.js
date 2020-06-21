import React from "react";

import TextCell from "../TextCell/TextCell";
import NumberCell from "../NumberCell/NumberCell";
import StarsCell from "../StarsCell/StarsCell";

const CellOfType = {
	text: (cellData) => <TextCell key={Math.random()} cellData={cellData} />,
	number: (cellData) => <NumberCell key={Math.random()} cellData={cellData} />,
	stars: (cellData) => <StarsCell key={Math.random()} cellData={cellData} />,
};

export { CellOfType, TextCell, NumberCell, StarsCell };
