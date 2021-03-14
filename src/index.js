import getTargets from "./get-targets";
import runAnimation from "./run-animation";

export default (userOptions) => {
	const targets = getTargets(userOptions);
	targets.forEach((target) => {
		runAnimation(target);
	});
};
