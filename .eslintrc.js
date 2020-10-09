module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: "plugin:prettier/recommended",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": "error",
		"linebreak-style": 0,
		indent: "off",
		"comma-dangle": "off",
		"class-methods-use-this": "off",
		"quote-props": "off",
		"default-case": "off",
		"no-new": "off",
		"import/no-cycle": "warn",
		"max-len": [
			"warn",
			{
				code: 120,
			},
		],
		"no-else-return": "off",
		"no-use-before-define": "off",
		"object-curly-newline": "off",
		// "no-underscore-dangle": [{ enforceInMethodNames: false }],
		"no-underscore-dangle": "warn",
		"import/no-cycle": "off",
	},
};
