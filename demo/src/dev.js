import numberRollup from "../../src/index";

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

	document.getElementById("custom-example-btn").addEventListener("click", () => {
		const form = document.getElementById("custom-example-form");
		const formData = new FormData(form);
		const startNumber = Number(formData.get("start"));
		const endNumber = Number(formData.get("end"));
		const duration = Number(formData.get("duration"));

		numberRollup({
			id: "custom-example",
			startNumber,
			endNumber,
			duration,
		});
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
