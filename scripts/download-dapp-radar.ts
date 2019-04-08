import axios from 'axios';
import * as fs from "fs";
import * as path from "path";
import * as write from "write-json-file";
import { Dapp } from "./types/DappRadar/Dapp";
import { TheRest, Category } from "./types/DappRadar/TheRest";

async function getDappRadarList(pagination: number) {
    const url = `https://dappradar.com/api/eos/dapps/list/${pagination}`
    const request = await axios.get<TheRest>(url);
    return request.data.data;
}

async function getDappRadarDapp(id: number) {
    const url = `https://dappradar.com/api/eos/dapp/${id}`
    const request = await axios.get<Dapp>(url);
    return request.data.data;
}

async function download(pagination: number): Promise<number> {
    const response = await getDappRadarList(pagination);

    for (const item of response.list) {
        // Must be EOS
        if (item.protocols.indexOf("eos") === -1) continue;

        // Must have volume or EOS transactions
        // if (item.volumeLastWeek === 0 && Number(item.weeklyUsers) === 0) continue;

        // Allowed Categories
        let category = "dapps";
        let subCategory = item.category;
        const name = item.slug;

        // If name is blank skip
        if (!name) continue;

        // Name Exceptions
        if (["decentwitter", "eoschat", "everipedia", "karma", "lumeos", "murmur", "nebula"].indexOf(name) !== -1) {
            subCategory = "social";
        } else if (["chintai"].indexOf(name) !== -1) {
            subCategory = "resources";
        } else if (["namedex", "short-name-register", "stname", "top-bidder", "eos-name-swaps"].indexOf(name) !== -1) {
            subCategory = "namebid";
        } else if (["ibank", "bank-of-staked", "cpu-emergency", "cpubaole", "enbank"].indexOf(name) !== -1) {
            subCategory = "resources";
        } else if (["pra-candybox", "more-candy"].indexOf(name) !== -1) {
            subCategory = "candy";
        } else if (["eos-account-registration-assistant", "eos-account-creator", "signupeos", "signupeoseos"].indexOf(name) !== -1) {
            subCategory = "account";
        }

        // Category Exceptions
        if (subCategory === "exchanges") {
            category = "exchanges";
            subCategory = "dex"
        } else if (subCategory === "high-risk") {
            subCategory = "gambling"
        } else if (subCategory === "collectibles" || subCategory === "marketplaces") {
            subCategory = "other"
        }

        // Check if file already exists
        const target = path.join(__dirname, "..", "json", "eos", category, subCategory, `${name}.json`);
        if (fs.existsSync(target)) continue;

        // Download DApp contract details
        console.log(`${category}::${subCategory} ${name}`)
        const dapp = await getDappRadarDapp(item.id);

        let contracts = (dapp.contracts) ? dapp.contracts.map(contract => contract.address) : [];

        // Dapp Contract exceptions
        if (name === "eos-lelego") {
            contracts = [
                "llgcontract1",
                "llgfundpoool",
                "llgcontract1",
                "llgcontract2",
                "llgcontract3",
                "llgcontract4",
                "llgcontract5",
                "llgcontracta"
            ]
        }
        write.sync(target, contracts);
    }
    return response.pageCount;
}

// Main
(async () => {
    let count = 0;
    let pagination = Infinity;

    while (count < pagination) {
        pagination = await download(count);
        count ++;
        console.log({count, pagination})
    }
})().catch(e => console.log(e));
