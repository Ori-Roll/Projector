import React, { useEffect } from "react";

import DescriptionCell from "../DescriptionCell/DescriptionCell";
import TextCell from "../TextCell/TextCell";
import NumberCell from "../NumberCell/NumberCell";
import StarsCell from "../StarsCell/StarsCell";
import StatusCell from "../StatusCell/StatusCell";
import { NEW_COLUMN_DATA } from "../../../../../../defaults";

// THIS LIST NEEDS TO MATCH knownCellTypes (see function below)

const CellOfType = {
	title: (id, content, cellChange) => (
		<TextCell key={id} id={id} content={content} cellChange={cellChange} />
	),
	description: (id, content, cellChange) => (
		<DescriptionCell key={id} id={id} content={content} cellChange={cellChange} />
	),
	text: (id, content, cellChange) => (
		<TextCell key={id} id={id} content={content} cellChange={cellChange} />
	),
	number: (id, content, cellChange) => (
		<NumberCell key={id} id={id} content={content} cellChange={cellChange} />
	),
	stars: (id, content, cellChange) => (
		<StarsCell key={id} id={id} content={content} cellChange={cellChange} />
	),
	status: (id, content, cellChange) => (
		<StatusCell key={id} id={id} content={content} cellChange={cellChange} />
	),
};

// THERE NEEDS TO BE A MATCH TO CELL TYPES
/* (function cellTypeMatchCheck() {
	for (let type in CellOfType) {
		if (!NEW_COLUMN_DATA[type]) {
			console.error(`NEW_COLUMN_DATA has no matching cellType for ${type} `);
		}
	}
	for (let type in NEW_COLUMN_DATA) {
		if (!CellOfType[type]) {
			console.error(`CellOfType has no matching cellType for ${type} `);
		}
	}
})(); */

export { CellOfType, TextCell, NumberCell, StarsCell, StatusCell };
