import _ from "lodash";
import { NewTab } from "../misc/NewDataMakers";
import { queries } from "@testing-library/react";

const crappyServerData = {
	users: {
		user1Id: {
			id: "user1Id",
			name: "user 1 name",
			projects: ["someProjId"],
			icon: "https://i1.pickpik.com/photos/830/669/108/labrador-head-hell-dog-preview.jpg",
		},
		user2Id: {
			id: "user2Id",
			name: "user 2 name",
			projects: ["someProjId", "otherProjId"],
			icon: "https://live.staticflickr.com/1129/1304953088_cf2a4fed22_b.jpg",
		},
		user3Id: {
			id: "user3Id",
			name: "user 3 name",
			projects: ["someProjId", "otherProjId", "ProjId3"],
			icon: "https://upload.wikimedia.org/wikipedia/commons/b/b7/South_African_Giraffe%2C_head.jpg",
		},
	},
	someProjId: {
		id: "someProjId",
		name: "some ProjName",
		users: [
			{ id: "user1Id", permission: "viewer" }, // can only view things
			{ id: "user2Is", permission: "user" }, // can change and add things
			{ id: "user3Id", permission: "boss" }, // at least one has to be boss, can change settings and delete project
			//users have a list of projects too, need valedations from projects when getting projects
		],
		tabs: [],
		tasks: {},
	},
	otherProjId: {
		id: "otherProjId",
		name: "other ProjName",
		users: [
			{ id: "user1Id", permission: "viewer" }, // can only view things
			{ id: "user2Is", permission: "user" }, // can change and add things
			{ id: "user3Id", permission: "boss" }, // at least one has to be boss, can change settings and delete project
			//users have a list of projects too, need valedations from projects when getting projects
		],
		tabs: [],
		tasks: {},
	},
	ProjId3: {
		id: "ProjId3",
		name: "3rd proj name",
		users: [
			{ id: "user1Id", permission: "viewer" }, // can only view things
			{ id: "user2Is", permission: "user" }, // can change and add things
			{ id: "user3Id", permission: "boss" }, // at least one has to be boss, can change settings and delete project
			//users have a list of projects too, need valedations from projects when getting projects
		],
		tabs: [],
		tasks: {},
	},
};

function someTime() {
	return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function setCrappyServerData(data) {
	await someTime();
	if (false) {
		if (Math.random() > 0.7) {
			return "error";
		}
	}
	crappyServerData[data] = data;
	return getCrappyServerData; // TODO: check for timeStamps mach
}

async function getCrappyServerData(query) {
	await someTime();
	if (false) {
		if (Math.random() > 0.7) {
			return "error";
		}
	}
	return _.get(crappyServerData, query);
}

/* a------
    b-------- go back to b and this time weit for b to finish
	   c--X	 
 - what if person 1 delete a column while person 2 changes colomns data	 
 - is there a way of saving changes and revert without saving everything ?

*/

crappyServerData["someProjId"].tabs.push(NewTab(null, crappyServerData["someProjId"]));
crappyServerData["otherProjId"].tabs.push(NewTab(null, crappyServerData["otherProjId"]));
crappyServerData["otherProjId"].tabs.push(NewTab(null, crappyServerData["otherProjId"]));
crappyServerData["ProjId3"].tabs.push(NewTab(null, crappyServerData["ProjId3"]));
crappyServerData["ProjId3"].tabs.push(NewTab(null, crappyServerData["ProjId3"]));
crappyServerData["ProjId3"].tabs.push(NewTab(null, crappyServerData["ProjId3"]));

export { setCrappyServerData, getCrappyServerData };
