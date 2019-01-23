import path from "path";
import glob from "glob";
import * as load from "load-json-file";
import * as write from "write-json-file";
import { Dataset, Data } from "../"

const data: Data = {
    eos: {
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
    }
};

// System
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "eos", "system", "*.json"))) {
    const {name} = path.parse(filepath);

    const dataset = load.sync<Dataset>(filepath);
    data.eos.system[name] = dataset;
}

// Dapps
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "eos", "dapps", "**", "*.json"))) {
    const dataset = load.sync<Dataset>(filepath);
    const sub = path.parse(filepath.split(path.join("json", "eos", "dapps"))[1]);
    const name = path.parse(sub.dir).name;

    if (!data.eos.dapps[name]) data.eos.dapps[name] = [];
    for (const row of dataset) {
        data.eos.dapps[name].push(row);
    }
}

// Exchanges
for (const filepath of glob.sync(path.join(__dirname, "..", "json", "eos", "exchanges", "**", "*.json"))) {
    const dataset = load.sync<Dataset>(filepath);
    const sub = path.parse(filepath.split(path.join("json", "eos", "exchanges"))[1]);
    const name = path.parse(sub.dir).name;

    if (!data.eos.exchanges[name]) data.eos.exchanges[name] = [];
    for (const row of dataset) {
        data.eos.exchanges[name].push(row);
    }
}

write.sync(path.join(__dirname, "..", "data.json"), data);
