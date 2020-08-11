import path from "path";
import glob from "glob";
import * as load from "load-json-file";
import * as write from "write-json-file";
import { Dataset, Blockchains, Token, System, DApps, Exchanges } from "./data"

function defaultExchanges(): Exchanges {
    return {
        cex: [],
        dex: [],
    }
}

function defaultDApps(): DApps {
    return {
        account: [],
        collectibles: [],
        gambling: [],
        games: [],
        marketplaces: [],
        namebid: [],
        resources: [],
        social: [],
        candy: [],
    }
}

function defaultSystem(): System {
    return {
        blacklist: [],
        ibc: [],
        bpay: [],
        vpay: [],
        eosio: [],
        genesis: [],
        names: [],
        ram: [],
        stake: [],
    }
}

const data: Blockchains = {
    eos: {
        exchanges: defaultExchanges(),
        dapps: defaultDApps(),
        system: defaultSystem(),
    },
    bos: {
        exchanges: defaultExchanges(),
        system: defaultSystem(),
    },
	wax: {
        system: defaultSystem(),
    }
};

// System Contracts
for (const chain of ["eos", "bos", "wax"]) {
    console.log(`processing [${chain}::system]`)
    for (const filepath of glob.sync(path.join(__dirname, "json", chain, "system", "*.json"))) {
        const {name} = path.parse(filepath);

        const dataset = load.sync<Dataset>(filepath);
        data[chain].system[name] = dataset;
    }
}

// Dapps
for (const chain of ["eos"]) {
    console.log(`processing [${chain}::dapps]`)
    for (const filepath of glob.sync(path.join(__dirname, "json", chain, "dapps", "**", "*.json"))) {
        const dataset = load.sync<Dataset>(filepath);
        const sub = path.parse(filepath.split(path.join("json", chain, "dapps"))[1]);
        const name = path.parse(sub.dir).name;

        if (!data[chain].dapps[name]) data[chain].dapps[name] = [];
        for (const row of dataset) {
            data[chain].dapps[name].push(row);
        }
    }
}

// Exchanges
for (const chain of ["eos", "bos"]) {
    console.log(`processing [${chain}::exchanges]`)
    for (const filepath of glob.sync(path.join(__dirname, "json", chain, "exchanges", "**", "*.json"))) {
        const dataset = load.sync<Dataset>(filepath);
        const sub = path.parse(filepath.split(path.join("json", chain, "exchanges"))[1]);
        const name = path.parse(sub.dir).name;

        if (!data[chain].exchanges[name]) data[chain].exchanges[name] = [];
        for (const row of dataset) {
            data[chain].exchanges[name].push(row);
        }
    }
}

// EOS Tokens
// for (const filepath of glob.sync(path.join(__dirname, "json", "eos", "tokens", "**", "*.json"))) {
//     const token = load.sync<Token>(filepath);
//     data.eos.tokens.push(token);
// }

write.sync(path.join(__dirname, "data.json"), data);
