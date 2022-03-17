const fs = require("fs");

const json = fs.readFileSync("../public/romania-grid-cropped.geojson", "utf8");
const grid = JSON.parse(json);

const gridWithIds = {
	...grid,
	features: grid.features.map((feature, index) => ({ ...feature, id: index })),
};

fs.writeFileSync("../public/romania-grid-cropped-with-ids.geojson", JSON.stringify(gridWithIds));
