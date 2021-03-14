import draw from "./draw";
import getNewNumber from "./get-new-number";

export default (target) => {
	markTargetAsActive(target.domElement, true);
	triggerAnimation(target);
};

const triggerAnimation = (target) => {
	const startTime = performance.now();
	let lastNumberDrawn = 0;
	let timeLastNumberDrawn;

	const run = () => {
		const msElapsedSinceStart = performance.now() - startTime;
		
		if (msElapsedSinceStart !== timeLastNumberDrawn) {
			const newNumber = getNewNumber(msElapsedSinceStart, target);

			if (newNumber !== lastNumberDrawn) {
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
