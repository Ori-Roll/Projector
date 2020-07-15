import React, { useEffect } from "react";

import DescriptionCell from "../DescriptionCell/DescriptionCell";
import TextCell from "../TextCell/TextCell";
import NumberCell from "../NumberCell/NumberCell";
import StarsCell from "../StarsCell/StarsCell";
import StatusCell from "../StatusCell/StatusCell";
import { NEW_COLUMN_DATA } from "../../../../../../defaults";

// THIS LIST NEEDS TO MATCH knownCellTypes (see function below)

const CellOfType = {
	description: (id, content, doCellContentChange) => (
		<DescriptionCell key={id} id={id} content={content} doCellContentChange={doCellContentChange} />
	),
	text: (id, content, doCellContentChange) => (
		<TextCell key={id} id={id} content={content} doCellContentChange={doCellContentChange} />
	),
	number: (id, content, doCellContentChange) => (
		<NumberCell key={id} id={id} content={content} doCellContentChange={doCellContentChange} />
	),
	stars: (id, content, doCellContentChange) => (
		<StarsCell key={id} id={id} content={content} doCellContentChange={doCellContentChange} />
	),
	status: (id, content, doCellContentChange) => (
		<StatusCell key={id} id={id} content={content} doCellContentChange={doCellContentChange} />
	),
};

// THERE NEEDS TO BE A MATCH TO CELL TYPES
(function cellTypeMatchCheck() {
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
})();

export { CellOfType, TextCell, NumberCell, StarsCell, StatusCell };
