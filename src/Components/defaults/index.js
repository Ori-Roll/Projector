import { deepFreeze } from "../misc";

const defaults = {
	SPACER_WIDTH: "3px",
	SPACER_WIDTH_ON_HOVER: "10px",
	CELL_BACKGROUND_COLOR: "#e2e2e2",
};

const NEW_COLUMN_DATA = {
	description: {
		type: "description",
		name: "Description",
		width: 250,
		minWidth: 100,
		maxWidth: 600,
		spacer: defaults.SPACER_WIDTH,
		color: "#a2cdde",
		isDraggable: false,
		isDragged: false,
		preferences: {},
		newCellContent: "",
	},
	text: {
		type: "text",
		name: "Text",
		width: 150,
		minWidth: 70,
		maxWidth: 600,
		spacer: defaults.SPACER_WIDTH,
		color: "#8b51bd",
		isDraggable: true,
		isDragged: false,
		preferences: {},
		newCellContent: "",
	},
	number: {
		type: "number",
		name: "Number",
		width: 80,
		minWidth: 40,
		maxWidth: 300,
		spacer: defaults.SPACER_WIDTH,
		color: "#8b51bd",
		isDraggable: true,
		isDragged: false,
		preferences: {},
		newCellContent: "0",
	},
	stars: {
		type: "stars",
		name: "Rating",
		width: 100,
		minWidth: 80,
		maxWidth: 300,
		spacer: defaults.SPACER_WIDTH,
		color: "rgb(64, 109, 255)",
		isDraggable: true,
		isDragged: false,
		preferences: {},
		newCellContent: "0",
	},
	status: {
		type: "status",
		name: "Status",
		width: 100,
		minWidth: 90,
		maxWidth: 300,
		spacer: defaults.SPACER_WIDTH,
		color: "rgb(164, 109, 255)",
		isDraggable: true,
		isDragged: false,
		preferences: {
			selectables: {
				none: { color: "gray", text: "" }, // needs to be unchangeble
				done: { color: "green", text: "DONE" },
				working: { color: "yellow", text: "WORKING" },
			},
		},
		newCellContent: "none",
	},
};

deepFreeze(NEW_COLUMN_DATA);

export default defaults;
export { NEW_COLUMN_DATA };
