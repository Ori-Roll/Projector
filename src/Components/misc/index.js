function makeKey() {
	return Math.random();
}

function newTimeStamp() {
	const newDate = new Date();
	return newDate.getTime();
}

function deepFreeze(obj) {
	Object.freeze(obj);
	if (obj === undefined) {
		return obj;
	}

	Object.getOwnPropertyNames(obj).forEach(function (prop) {
		if (
			obj[prop] !== null &&
			(typeof obj[prop] === "object" || typeof obj[prop] === "function") &&
			!Object.isFrozen(obj[prop])
		) {
			deepFreeze(obj[prop]);
		}
	});

	return obj;
}

export { makeKey, deepFreeze, newTimeStamp };
