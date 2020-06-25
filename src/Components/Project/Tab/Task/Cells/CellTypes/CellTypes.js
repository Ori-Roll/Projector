import React from "react";

import TextCell from "../TextCell/TextCell";
import NumberCell from "../NumberCell/NumberCell";
import StarsCell from "../StarsCell/StarsCell";
import StatusCell from "../StatusCell/StatusCell";

const CellOfType = {
	text: (cellData, column) => <TextCell key={Math.random()} cellData={(cellData, column)} />,
	number: (cellData, column) => <NumberCell key={Math.random()} cellData={(cellData, column)} />,
	stars: (cellData, column) => <StarsCell key={Math.random()} cellData={(cellData, column)} />,
	status: (cellData, column) => <StatusCell key={Math.random} cellData={(cellData, column)} />,
};

export { CellOfType, TextCell, NumberCell, StarsCell, StatusCell };
