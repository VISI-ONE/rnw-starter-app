/* eslint-disable quote-props, quotes */

module.exports = {
	coveragePathIgnorePatterns: [
    "<rootDir>/src/index",
    "<rootDir>/src/utils/routing/",
    "<rootDir>/src/components/Picker/WebPicker.js"
  ],
	coverageDirectory: 'coverageNative',
	preset: 'react-native',
	rootDir: '../../',
	collectCoverageFrom: [
		'src/**/*.{js,jsx}'
	],
	setupFiles: [
		'<rootDir>/config/polyfills.js'
	],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.js?(x)',
		'<rootDir>/src/**/?(*.)(spec|test).js?(x)'
	],
	testEnvironment: 'node',
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
		"^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
		"^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
	},
	transformIgnorePatterns: [], // has to be here (no idea why, but it breaks if its gone)
	moduleFileExtensions: [
		'ios.js',
		'android.js',
		'js',
		'json',
		'jsx',
		'node'
	],
	snapshotSerializers: [
		'enzyme-to-json/serializer',
		'react-native-web/jest/serializer'
	],
};
