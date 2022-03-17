module.exports = {
	style: {
		postcss: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
	babel: {
		dangerouslyAddModulePathsToTranspile: ["react-map-gl"], // this line!
		plugins: ["@babel/plugin-proposal-logical-assignment-operators", "@babel/plugin-proposal-optional-chaining"],
	},
};
