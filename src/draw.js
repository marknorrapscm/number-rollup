export default (target, newNumberRounded) => {
	const numberToDraw = getNumberToDraw(newNumberRounded, target);
	target.domElement.innerHTML = numberToDraw;
};

const getNumberToDraw = (newNumberRounded, target) => {
	let numberToDraw = getNumber(newNumberRounded, target.endNumber, target.direction);

	if (target.formatNumber) {
		numberToDraw = target.formatNumber(numberToDraw);
	}

	return numberToDraw;
};

const getNumber = (newNumberRounded, endNumber, direction) => {
	let numberToUse;

	if (direction === "ascending") {
		if (newNumberRounded < endNumber) {
			numberToUse = newNumberRounded;
		} else {
			numberToUse = endNumber;
		}
	} else if (direction === "descending") {
		if (newNumberRounded > endNumber) {
			numberToUse = newNumberRounded;
		} else {
			numberToUse = endNumber;
		}
	} else {
		console.error("getNumber() not set");
	}

	return numberToUse;
};
