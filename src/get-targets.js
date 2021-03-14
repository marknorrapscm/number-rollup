export default (userOptions) => {
	const targetElements = getTargets(userOptions);

	if (targetElements.length === 0) {
		console.warn("number-rollup animation was triggered but no target elements were found");
	}

	return targetElements;
};

const getTargets = (userOptions) => {
	if (userOptions && userOptions.id) {
		return getSingleTarget(userOptions);
	} else {
		return readTargetsSpecifiedInDom(userOptions);
	}
};

const getSingleTarget = (userOptions) => {
	const newTarget = generateSingleTargetFromOptions(userOptions);
	if (newTarget) {
		return [newTarget];
	} else {
		return [];
	}
};

const generateSingleTargetFromOptions = (userOptions) => {
	const domElement = document.getElementById(userOptions.id);

	if (!isDomElementAlreadyBeingAnimated(domElement)) {
		const startNumber = Number(userOptions.startNumber);
		const endNumber = Number(userOptions.endNumber);
		const duration = Number(userOptions.duration);

		return {
			domElement,
			startNumber,
			endNumber,
			duration,
			formatNumber: userOptions.formatNumber
		};
	}
};

const readTargetsSpecifiedInDom = (userOptions) => {
	const domElements = document.querySelectorAll(".number-rollup");
	const targetElements = [];

	for (let x = 0; x < domElements.length; x++) {
		const domElement = domElements[x];

		if (!isDomElementAlreadyBeingAnimated(domElement)) {
			const newTarget = generateTargetFromDomElement(domElement, userOptions);
			targetElements.push(newTarget);
		}
	}

	return targetElements;
};

const generateTargetFromDomElement = (domElement, userOptions) => {
	const startNumber = Number(domElement.getAttribute("data-number-rollup-start"));
	const endNumber = Number(domElement.getAttribute("data-number-rollup-end"));
	const duration = Number(domElement.getAttribute("data-number-rollup-duration"));

	return {
		domElement,
		startNumber,
		endNumber,
		duration,
		formatNumber: userOptions ? userOptions.formatNumber : undefined
	};
};

const isDomElementAlreadyBeingAnimated = (domElement) => {
	return domElement.classList.contains("number-rollup-is-active");
};
