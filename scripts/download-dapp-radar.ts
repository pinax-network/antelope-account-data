import axios from 'axios';
import * as fs from "fs";
import * as path from "path";
import * as write from "write-json-file";
import { Dapp } from "./types/DappRadar/Dapp";
import { TheRest, Protocol, Category } from "./types/DappRadar/TheRest";

async function getDappRadarList() {
    const request = await axios.get<TheRest>("https://dappradar.com/api/xchain/dapps/theRest");
    return request.data.data.list;
}

async function getDappRadarDapp(id: number) {
    const request = await axios.get<Dapp>(`https://dappradar.com/api/eos/dapp/${id}`);
    return request.data.data;
}

(async () => {
    const list = await getDappRadarList();

    for (const item of list) {
        // Must be EOS
        if (item.protocols.indexOf(Protocol.EOS) === -1) continue;

        // Must have volume or EOS transactions
        if (item.volumeLastWeek === 0 && Number(item.weeklyUsers) === 0) continue;

        // Allowed Categories
        let category = "dapps";
        let subCategory = item.category;

        // Category Exceptions
        if (subCategory === "exchanges") {
            category = "exchanges";
            subCategory = "dex"
        }

        // Name Exceptions
        if (["eoschat", "everipedia", "karma", "lumeos", "murmur", "nebula" ].indexOf(item.slug) !== -1) {
            subCategory = "social";
        } else if (["chintai"].indexOf(item.slug) !== -1) {
            subCategory = "marketplaces";
        } else if (["namedex", "short-name-register", "stname", "top-bidder"].indexOf(item.slug) !== -1) {
            category = "dapps";
            subCategory = "namebid";
        } else if (["bank-of-staked", "cpu-emergency", "cpubaole", "enbank"].indexOf(item.slug) !== -1) {
            subCategory = "resources";
        } else if (["pra-candybox"].indexOf(item.slug) !== -1) {
            subCategory = "token-distribution";
        } else if (["eos-account-creator", "signupeos", "signupeoseos"].indexOf(item.slug) !== -1) {
            subCategory = "account-creation";
        }

        // Check if file already exists
        const target = path.join(__dirname, "..", "json", "eos", category, subCategory, `${item.slug}.json`);
        if (fs.existsSync(target)) continue;

        // Download DApp contract details
        console.log(`${category}::${subCategory} ${item.slug}`)
        const dapp = await getDappRadarDapp(item.id);
        const contracts = dapp.contracts.map(contract => contract.address);
        write.sync(target, contracts);
    }
})()