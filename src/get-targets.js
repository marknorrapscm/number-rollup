export default (userOptions) => {
	let targetElements = [];

	if (userOptions && userOptions.id) {
		const newTarget = generateSingleTargetFromOptions(userOptions);
		targetElements.push(newTarget);
	} else {
		const targets = readTargetsSpecifiedInDom(userOptions);
		targetElements = targets;
	}

	return targetElements;
};

const determineDirection = (startNumber, endNumber) => {
	if (startNumber < endNumber) {
		return Direction.Ascending;
	} else {
		return Direction.Descending;
	}
};

const Direction = Object.freeze({
	Ascending: "ascending",
	Descending: "descending",
});

const generateSingleTargetFromOptions = (userOptions) => {
	const domElement = document.getElementById(userOptions.id);
	const range = userOptions.endNumber - userOptions.startNumber;
	const incrementPerMillisecond = range / userOptions.duration;
	const direction = determineDirection(userOptions.startNumber, userOptions.endNumber);

	return {
		domElement,
		startNumber: userOptions.startNumber,
		endNumber: userOptions.endNumber,
		incrementPerMillisecond,
		formatNumber: userOptions.formatNumber,
		direction,
	};
};

const readTargetsSpecifiedInDom = (userOptions) => {
	const domElements = document.querySelectorAll(".number-rollup");
	const targetElements = [];

	domElements.forEach((domElement) => {
		const newTarget = generateTargetFromDomElement(domElement, userOptions);
		targetElements.push(newTarget);
	});

	return targetElements;
};

const generateTargetFromDomElement = (domElement, userOptions) => {
	const optionsFromDom = readOptionsFromDomElement(domElement);
	const range = optionsFromDom.endNumber - optionsFromDom.startNumber;
	const incrementPerMillisecond = range / optionsFromDom.duration;
	const direction = determineDirection(optionsFromDom.startNumber, optionsFromDom.endNumber);

	return {
		domElement,
		startNumber: optionsFromDom.startNumber,
		endNumber: optionsFromDom.endNumber,
		incrementPerMillisecond,
		formatNumber: userOptions ? userOptions.formatNumber : undefined,
		direction,
	};
};

const readOptionsFromDomElement = (domElement) => {
	const startNumber = Number(domElement.getAttribute("data-number-rollup-start"));
	const endNumber = Number(domElement.getAttribute("data-number-rollup-end"));
	const duration = Number(domElement.getAttribute("data-number-rollup-duration"));

	return {
		startNumber,
		endNumber,
		duration,
	};
};
