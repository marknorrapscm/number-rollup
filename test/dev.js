import numberRollup from "../src/index";

const setupHighlightJs = () => {
	document.querySelectorAll("code").forEach((element) => {
		element.innerHTML = element.innerHTML
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	});

	hljs.initHighlightingOnLoad();
};

const setupClickEvents = () => {
	document.getElementById("example-1-btn").addEventListener("click", () => {
		numberRollup({
			id: "example-1",
			startNumber: 0,
			endNumber: 500,
			duration: 500,
			formatNumber: myCustomFormatter,
		});
	});

	document.getElementById("example-2-btn").addEventListener("click", () => {
		numberRollup({
			id: "example-2",
			startNumber: 5000,
			endNumber: 250,
			duration: 500,
		});
	});

	document.getElementById("example-3-btn").addEventListener("click", () => {
		numberRollup();
	});

	document.querySelectorAll(".view-source-btn").forEach((element) => {
		element.addEventListener("click", function () {
			const viewSourceFor = this.getAttribute("data-for");
			const codeContainer = document.getElementById(viewSourceFor);
			codeContainer.classList.toggle("hidden");
		});
	});

	//example-1-demo-code
};

setupHighlightJs();
setupClickEvents();

const formatString = (value) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	}).format(value);
};

const myCustomFormatter = function (v) {
	return `$${v}`;
};

/**
 * TODO:
 *
 * 1. Add more info to the index.html
 * 	a. Buttons to trigger animation
 *  b. Code in a dropdown
 * 2. Add to Github
 * 3. Create ReadME detailing how to run it
 * 4. Read about NPM - do we publish entire thing or only files we specify?
 * 5. Publish the example to Github pages
 * 6. Try using the package in another project - does it work?
 * 7. Finally, publish to NPM
 *
 */
