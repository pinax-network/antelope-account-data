const path = require("path");
const load = require("load-json-file");
const write = require("write-json-file");
const glob = require("glob");

const datasets = {};

for (const filepath of glob.sync(path.join(__dirname, "..", "json", "*.json"))) {
    const {name, ext} = path.parse(filepath);
    if (ext !== ".json") continue;

    const dataset = load.sync(filepath);
    datasets[name] = dataset;
}

write.sync(path.join(__dirname, "..", "index.json"), datasets);
