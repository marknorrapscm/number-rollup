module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"jest": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12,
		"sourceType": "module",
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"no-unused-vars": [
			"warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
		],
		"react/prop-types": [
			0
		],
	}
};
