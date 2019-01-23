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
        let target = "";
        switch (item.category) {
        case Category.Exchanges:
            target = path.join(__dirname, "..", "json", "eos", "exchanges", "dex", `${item.slug}.json`);
            break;
        default:
            target = path.join(__dirname, "..", "json", "eos", "dapps", item.category, `${item.slug}.json`);
        }

        // Check if file already exists
        if (fs.existsSync(target)) continue;

        // Download DApp contract details
        console.log("download:", item.slug)
        const dapp = await getDappRadarDapp(item.id);
        const contracts = dapp.contracts.map(contract => contract.address);
        write.sync(target, contracts);
    }
})()