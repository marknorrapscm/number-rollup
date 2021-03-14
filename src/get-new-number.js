/* eslint-disable indent */

export default (msElapsedSinceStart, target) => {
	const { startNumber, endNumber } = target;

	const newNumber = applyEasing(msElapsedSinceStart, target);

	if (startNumber > endNumber) {
		const newNumberCorrected = startNumber - newNumber;
		return Math.max(newNumberCorrected, endNumber);
	} else {
		return Math.min(newNumber, endNumber);
	}
};

/**
 * Easing functions implemented from http://gizma.com/easing/
 */
const applyEasing = (msElapsedSinceStart, target) => {
	const { startNumber, endNumber, duration, easing } = target;
	const smallestNumber = Math.min(startNumber, endNumber);
	const range = getRange(startNumber, endNumber);

	switch (easing.toLowerCase()) {
		case "linear":
		default: {
			return Math.floor(((range * msElapsedSinceStart) / duration) + smallestNumber);
		}
		case "easein": {
			const t = msElapsedSinceStart / duration;
			return Math.floor(range * t * t + smallestNumber);
		}
		case "easeout": {
			const t = msElapsedSinceStart / duration;
			return Math.floor((range * -1) * t * (t - 2) + smallestNumber) + 1;
		}
		case "easeinquintic": {
			const t = msElapsedSinceStart / duration;
			return Math.floor(range * t * t * t * t * t + smallestNumber);
		}
		case "easeoutquintic": {
			const t = (msElapsedSinceStart / duration) - 1;
			return Math.floor(range * ((t * t * t * t * t) + 1) + smallestNumber);
		}
		case "easeinout": {
			const t = msElapsedSinceStart / (duration / 2);

			if (t < 1) {
				return Math.floor(range / 2 * t * t * t * t * t + smallestNumber);
			} else {
				const t2 = t - 2;
				return Math.floor(range / 2 * (t2 * t2 * t2 * t2 * t2 + 2) + smallestNumber);
			}
		}
	}
};

const getRange = (startNumber, endNumber) => {
	return Math.max(startNumber, endNumber) - Math.min(startNumber, endNumber);
};
