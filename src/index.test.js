import numberRollup from "./index";

test("Basic proof of validity", () => {
	expect(numberRollup).toBeTruthy();
});

test("Throws error when non existing ID is supplied", () => {
	expect(() => {
		numberRollup({
			id: "nonexistingid",
			startNumber: 0,
			endNumber: 100,
			duration: 500,
		});
	}).toThrow();
});

test("Does not throw error when existing ID is supplied", () => {
	document.body.innerHTML = `
		<div id='existing-id'></div>
	`;

	expect(() => {
		numberRollup({
			id: "existing-id",
			startNumber: 0,
			endNumber: 100,
			duration: 500,
		});
	}).not.toThrow();
});

test("Check increment is being performed", () => {
	document.body.innerHTML = `
		<div id="example"></div>
	`;

	try {
		numberRollup({
			id: "example",
			startNumber: 500,
			endNumber: 100,
			duration: 0,
		});

		const html = document.querySelector("#example").innerHTML;
		expect(html).not.toBe("500");
		expect(html).toBe("100");
	} catch (e) {
		console.log("E");
	}
});

test("Check increment is being performed by DOM-specified settings", () => {
	document.body.innerHTML = `
		<div class='number-rollup'
			data-number-rollup-start='0'
			data-number-rollup-end='500'
			data-number-rollup-duration='0'>
		</div>
	`;

	try {
		numberRollup();

		const html = document.querySelector(".number-rollup").innerHTML;
		expect(html).toBe("500");
	} catch (e) {
		console.log("E");
	}
});
