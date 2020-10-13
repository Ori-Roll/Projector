import React from "react";

import DescriptionCell from "../DescriptionCell/DescriptionCell";
import TextCell from "../TextCell/TextCell";
import NumberCell from "../NumberCell/NumberCell";
import StarsCell from "../StarsCell/StarsCell";
import StatusCell from "../StatusCell/StatusCell";
import AssignCell from "../AssignCell/AssignCell";

import { NEW_COLUMN_DATA } from "../../../../../../defaults";

// THIS LIST NEEDS TO MATCH knownCellTypes (see function below)

const CellOfType = {
	assign: (cell, doCellChange, assign, task, taskChange) => (
		<AssignCell
			key={cell._id}
			cell={cell}
			doCellChange={doCellChange}
			assign={assign}
			task={task}
			taskChange={taskChange}
		/>
	),
	title: (cell, doCellChange) => (
		<TextCell key={cell._id} cell={cell} doCellChange={doCellChange} />
	),
	description: (cell, doCellChange) => (
		<DescriptionCell key={cell._id} cell={cell} doCellChange={doCellChange} />
	),
	text: (cell, doCellChange) => <TextCell key={cell._id} cell={cell} doCellChange={doCellChange} />,
	number: (cell, doCellChange) => (
		<TextCell key={cell._id} cell={cell} doCellChange={doCellChange} />
	),
	stars: (cell, doCellChange) => (
		<StarsCell key={cell._id} cell={cell} doCellChange={doCellChange} />
	),
	status: (cell, doCellChange) => (
		<StatusCell key={cell._id} cell={cell} doCellChange={doCellChange} />
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
