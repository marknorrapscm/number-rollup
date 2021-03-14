import draw from "./draw";

export default (target) => {
	markTargetAsActive(target.domElement, true);
	const startTime = performance.now();
	let lastNumberDrawn = 0;
	let timeLastNumberDrawn;

	const run = () => {
		const msElapsedSinceStart = performance.now() - startTime;

		if (msElapsedSinceStart !== timeLastNumberDrawn) {
			const newNumber = getNewNumber(msElapsedSinceStart, target);
			if (newNumber !== lastNumberDrawn) {
				console.log("Drawing: " + newNumber);
				draw(target, newNumber);
				lastNumberDrawn = newNumber;
				timeLastNumberDrawn = msElapsedSinceStart;
			}
		}

		if (shouldAnimationContinue(lastNumberDrawn, target)) {
			requestAnimationFrame(run);
		} else {
			markTargetAsActive(target.domElement, false);
		}
	};

	run();
};

const markTargetAsActive = (domElement, isActive) => {
	const isActiveClass = "number-rollup-is-active";

	if (isActive) {
		domElement.classList.add(isActiveClass);
	} else {
		domElement.classList.remove(isActiveClass);
	}
};

const getNewNumber = (msElapsedSinceStart, target) => {
	const { startNumber, endNumber, duration } = target;
	const range = Math.max(startNumber, endNumber) - Math.min(startNumber, endNumber);
	const incrementPerMillisecond = range / duration;
	const newNumber = incrementPerMillisecond * msElapsedSinceStart;

	if (startNumber > endNumber) {
		const newNumberRounded = Math.floor(startNumber - newNumber);
		return Math.max(newNumberRounded, endNumber);
	} else {
		const newNumberRounded = Math.floor(startNumber + newNumber);
		return Math.min(newNumberRounded, endNumber);
	}
};

const shouldAnimationContinue = (lastNumberDrawn, target) => {
	const { startNumber, endNumber } = target;

	if (startNumber > endNumber) {
		if (lastNumberDrawn <= endNumber) {
			return false;
		} else {
			return true;
		}
	} else {
		if (lastNumberDrawn >= endNumber) {
			return false;
		} else {
			return true;
		}
	}
};
