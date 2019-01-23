import path from "path";
import glob from "glob";
import * as load from "load-json-file";
import * as write from "write-json-file";
import { Dataset, Data } from "../"

const data: Data = {
    exchanges: {
        cex: [],
        dex: [],
    },
    dapps: {
        account_creation: [],
        collectibles: [],
        gambling: [],
        games: [],
        marketplaces: [],
        namebid: [],
        resources: [],
        social: [],
        token_distribution: [],
    },
    system: {
        blacklist: [],
        genesis: [],
        system: [],
    },
};

// System
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "system", "*.json"))) {
    const {name} = path.parse(filepath);

    const dataset = load.sync<Dataset>(filepath);
    data.system[name] = dataset;
}

// Dapps
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "dapps", "**", "*.json"))) {
    const dataset = load.sync<Dataset>(filepath);
    const sub = path.parse(filepath.split(path.join("json", "dapps"))[1]);
    const name = path.parse(sub.dir).name;

    if (!data.dapps[name]) data.dapps[name] = [];
    for (const row of dataset) {
        data.dapps[name].push(row);
    }
}

// Exchanges
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "exchanges", "**", "*.json"))) {
    const dataset = load.sync<Dataset>(filepath);
    const sub = path.parse(filepath.split(path.join("json", "exchanges"))[1]);
    const name = path.parse(sub.dir).name;

    if (!data.exchanges[name]) data.exchanges[name] = [];
    for (const row of dataset) {
        data.exchanges[name].push(row);
    }
}

write.sync(path.join(__dirname, "..", "data.json"), data);
