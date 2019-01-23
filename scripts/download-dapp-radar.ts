import axios from 'axios';
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

        // TEMP - REMOVE LATER
        if (item.category !== Category.Gambling) continue;

        const dapp = await getDappRadarDapp(item.id);

        for (const contract of dapp.contracts) {
            console.log(contract.address);
        }
    }
})()