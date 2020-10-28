export default (userOptions) => {
	let targetElements = [];

	if (userOptions && userOptions.id) {
		const newTarget = generateSingleTargetFromOptions(userOptions);
		if (newTarget) {
			targetElements.push(newTarget);
		}
	} else {
		const targets = readTargetsSpecifiedInDom(userOptions);
		targetElements = targets;
	}

	if (targetElements.length === 0) {
		console.warn("number-rollup animation was triggered but no target elements were found");
	}

	return targetElements;
};

const generateSingleTargetFromOptions = (userOptions) => {
	const domElement = document.getElementById(userOptions.id);

	if (!isDomElementCurrentBeingAnimated(domElement)) {
		const startNumber = Number(userOptions.startNumber);
		const endNumber = Number(userOptions.endNumber);
		const duration = Number(userOptions.duration);
		const range = endNumber - startNumber;
		const incrementPerMillisecond = range / duration;
		const direction = determineDirection(startNumber, endNumber);

		return {
			domElement,
			startNumber,
			endNumber,
			incrementPerMillisecond,
			formatNumber: userOptions.formatNumber,
			direction,
		};
	}
};

const readTargetsSpecifiedInDom = (userOptions) => {
	const domElements = document.querySelectorAll(".number-rollup");
	const targetElements = [];

	for (let x = 0; x < domElements.length; x++) {
		const domElement = domElements[x];

		if (!isDomElementCurrentBeingAnimated(domElement)) {
			const newTarget = generateTargetFromDomElement(domElement, userOptions);
			targetElements.push(newTarget);
		}
	}

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

const isDomElementCurrentBeingAnimated = (domElement) => {
	return domElement.classList.contains("number-rollup-is-active");
};
