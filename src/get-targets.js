export default (userOptions) => {
	let targetElements = [];

	if (userOptions && userOptions.id) {
		const domElement = document.getElementById(userOptions.id);
		const range = userOptions.endNumber - userOptions.startNumber;
		const incrementPerMillisecond = range / userOptions.duration;
		const direction = determineDirection(userOptions.startNumber, userOptions.endNumber);

		const newTarget = {
			targetElements,
			domElement,
			startNumber: userOptions.startNumber,
			endNumber: userOptions.endNumber,
			incrementPerMillisecond,
			formatNumber: userOptions.formatNumber,
			direction,
		};

		targetElements = [].concat(targetElements, newTarget);
	} else {
		const elements = document.querySelectorAll(".number-rollup");

		elements.forEach((element) => {
			const domElement = element;
			const startNumber = Number(element.getAttribute("data-number-rollup-start"));
			const endNumber = Number(element.getAttribute("data-number-rollup-end"));
			const duration = Number(element.getAttribute("data-number-rollup-duration"));
			const range = endNumber - startNumber;
			const incrementPerMillisecond = range / duration;
			const direction = determineDirection(startNumber, endNumber);

			const newTarget = {
				targetElements,
				domElement,
				startNumber,
				endNumber,
				incrementPerMillisecond,
				formatNumber: userOptions ? userOptions.formatNumber : undefined,
				direction,
			};

			targetElements = [].concat(targetElements, newTarget);
		});
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
