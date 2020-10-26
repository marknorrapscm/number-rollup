# number-rollup

<div align="center" markdown="1">

![npm bundle size](https://img.shields.io/bundlephobia/minzip/number-rollup?color=success&label=size)
[![npm](https://img.shields.io/npm/v/number-rollup)](https://www.npmjs.com/package/number-rollup)
[![npm](https://img.shields.io/npm/l/number-rollup)](https://www.npmjs.com/package/number-rollup)
[![npm](https://img.shields.io/npm/dw/number-rollup)](https://www.npmjs.com/package/number-rollup)

</div>

### Demo

https://marknorrapscm.github.io/number-rollup/

## Features

-   Smooth rising / falling number animations
-   VanillaJS
-   Zero dependencies
-   1.3KB gzipped
-   No CSS; styling is under your control
-   Uses `requestAnimationFrame()` rather than `setTimeout()`

##### Note

<small>Some browsers have options that implement anti-fingerprinting techniques which significantly reduce the millisecond accuracy of `new Date()` and `performance.now()`. These options are not enabled by default in Firefox (`privacy.resistFingerprinting`) or Chrome but, if they are, the animation won't run as smoothly.</small>

## Installation

```sh
npm install number-rollup --save
```

## Usage

There are two ways to create animations.

#### Method A:

Invoke the method on an element-by-element basis.

```html
<div id="example-1"></div>
```

```js
import numberRollup from "number-rollup";

numberRollup({
	id: "example-1",
	startNumber: 0,
	endNumber: 500,
	duration: 500, // Milliseconds
});
```

#### Method B:

Apply class `.number-rollup` to one or more target elements and use data attributes to set the options. `numberRollup()` will find all elements with the class and apply the animation.

```html
<button
	class="number-rollup"
	data-number-rollup-start="100"
	data-number-rollup-end="100000"
	data-number-rollup-duration="1000"
></button>
```

```js
import numberRollup from "number-rollup";

numberRollup();
```

## Options

`id`: _string_ <br />
The ID of the target element when creating a single animation.

`startNumber`: _Number_ <br />
The animation will roll _from_ this number. Must be an integer.

`endNumber`: _Number_ <br />
The animation will roll _to_ this number. Must be an integer.

`duration`: _Number_ <br />
The duration of the animation in milliseconds. Must be an integer.

`formatNumber`: _function_ (optional)<br />
A function that will be applied to the animated number each time before it is drawn. For example, turning `500` into `$500`. See the demo for a usage example.
