import axios from 'axios';
import { DappRadar, Protocol } from "./DappRadar";

(async () => {
    const request = await axios.get<DappRadar>("https://dappradar.com/api/xchain/dapps/theRest");

    for (const item of request.data.data.list) {
        if (item.protocols.indexOf(Protocol.EOS) === -1) continue;
        if (item.category !== "gambling") continue;
        if (item.category !== "gambling") continue;

        console.log(item.id, item.slug, item.volumeLastWeek, item.volumeLastWeekInUSD);
    }
})()