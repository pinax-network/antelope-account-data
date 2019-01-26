import axios from 'axios';
import * as fs from "fs";
import * as path from "path";
import * as write from "write-json-file";
import { Dapp } from "./types/DappRadar/Dapp";
import { TheRest, Protocol, Category } from "./types/DappRadar/TheRest";

async function getDappRadarList(pagination: number) {
    const request = await axios.get<TheRest>(`https://dappradar.com/api/xchain/dapps/list/${pagination}`);
    return request.data.data.list;
}

async function getDappRadarDapp(id: number) {
    const request = await axios.get<Dapp>(`https://dappradar.com/api/eos/dapp/${id}`);
    return request.data.data;
}

async function download(pagination: number) {
    const list = await getDappRadarList(pagination);

    for (const item of list) {
        // Must be EOS
        if (item.protocols.indexOf(Protocol.EOS) === -1) continue;

        // Must have volume or EOS transactions
        // if (item.volumeLastWeek === 0 && Number(item.weeklyUsers) === 0) continue;

        // Allowed Categories
        let category = "dapps";
        let subCategory = item.category;

        // Name Exceptions
        if (["decentwitter", "eoschat", "everipedia", "karma", "lumeos", "murmur", "nebula"].indexOf(item.slug) !== -1) {
            subCategory = "social";
        } else if (["chintai"].indexOf(item.slug) !== -1) {
            subCategory = "resources";
        } else if (["namedex", "short-name-register", "stname", "top-bidder", "eos-name-swaps"].indexOf(item.slug) !== -1) {
            subCategory = "namebid";
        } else if (["ibank", "bank-of-staked", "cpu-emergency", "cpubaole", "enbank"].indexOf(item.slug) !== -1) {
            subCategory = "resources";
        } else if (["pra-candybox", "more-candy"].indexOf(item.slug) !== -1) {
            subCategory = "candy";
        } else if (["eos-account-registration-assistant", "eos-account-creator", "signupeos", "signupeoseos"].indexOf(item.slug) !== -1) {
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
        const target = path.join(__dirname, "..", "json", "eos", category, subCategory, `${item.slug}.json`);
        if (fs.existsSync(target)) continue;

        // Download DApp contract details
        console.log(`${category}::${subCategory} ${item.slug}`)
        const dapp = await getDappRadarDapp(item.id);

        let contracts = (dapp.contracts) ? dapp.contracts.map(contract => contract.address) : [];

        // Dapp Contract exceptions
        if (item.slug === "eos-lelego") {
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
}

// Main
(async () => {
    let pagination = 0;
    while (true) {
        try {
            console.log("pagination", pagination);
            await download(pagination);
        } catch (e) {
            console.log("finished");
            break;
        }
        pagination ++;
    }
})();
