const path = require("path");
const load = require("load-json-file");
const write = require("write-json-file");
const glob = require("glob");

const data = {
    exchanges: {},
    dapps: {}
};

// Simple
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "*.json"))) {
    const {name} = path.parse(filepath);

    const dataset = load.sync(filepath);
    data[name] = dataset;
}

// Dapps
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "dapps", "**", "*.json"))) {
    const dataset = load.sync(filepath);
    const sub = path.parse(filepath.split(path.join("json", "dapps"))[1]);
    const name = path.parse(sub.dir).name;

    if (!data.dapps[name]) data.dapps[name] = [];
    for (const row of dataset) {
        data.dapps[name].push(row);
    }
}

// Exchanges
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "exchanges", "**", "*.json"))) {
    const dataset = load.sync(filepath);
    const sub = path.parse(filepath.split(path.join("json", "exchanges"))[1]);
    const name = path.parse(sub.dir).name;

    if (!data.exchanges[name]) data.exchanges[name] = [];
    for (const row of dataset) {
        data.exchanges[name].push(row);
    }
}

write.sync(path.join(__dirname, "..", "data.json"), data);
