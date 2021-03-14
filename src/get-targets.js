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
		return {
			domElement,
			startNumber: Number(userOptions.startNumber),
			endNumber: Number(userOptions.endNumber),
			duration: Number(userOptions.duration),
			formatNumber: userOptions.formatNumber,
			easing: userOptions.easing || ""
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
	return {
		domElement,
		startNumber: Number(domElement.getAttribute("data-number-rollup-start")),
		endNumber: Number(domElement.getAttribute("data-number-rollup-end")),
		duration: Number(domElement.getAttribute("data-number-rollup-duration")),
		easing: domElement.getAttribute("data-number-rollup-easing") || "",
		formatNumber: userOptions ? userOptions.formatNumber : undefined
	};
};

const isDomElementAlreadyBeingAnimated = (domElement) => {
	return domElement.classList.contains("number-rollup-is-active");
};
