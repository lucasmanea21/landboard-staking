const turf = require("./turf.min.js");
const fs = require("fs");

let romaniaBoundaries = fs.readFileSync("./romania-boundaries.geojson");
let romaniaBoundariesGeoJSON = JSON.parse(romaniaBoundaries);

const grid = turf.squareGrid([-90, -180, 90, 180], 1, "kilometers");

fs.writeFileSync("../public/griddd.json", JSON.stringify(grid));
