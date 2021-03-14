export default (target, newNumberRounded) => {
	const numberToDraw = getNumberToDraw(newNumberRounded, target);
	target.domElement.innerHTML = numberToDraw;
};

const getNumberToDraw = (newNumberRounded, target) => {
	if (target.formatNumber) {
		return target.formatNumber(newNumberRounded);
	} else {
		return newNumberRounded;
	}
};