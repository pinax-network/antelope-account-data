import axios from 'axios';
import * as fs from "fs";
import * as path from "path";
import * as write from "write-json-file";
import { Bps } from "./types/validate.eosn.io/bps";

async function getBps() {
    const request = await axios.get<Bps>(`https://validate.eosnation.io/mainnet/bps.json`);
    return request.data
}

async function download() {
    const bps = await getBps();
    const accounts = [];
    for (const producer of bps.producers) {
        if (!producer.info.vote_percent) continue;
        if (producer.info.vote_percent < 0.50) continue;
        if (!producer.input) continue;
        accounts.push(producer.input.producer_account_name);
    }
    // Check if file already exists
    const target = path.join(__dirname, "..", "json", "eos", "system", "block-producer.json");
    write.sync(target, accounts);
}

download()