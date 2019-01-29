import axios from 'axios';
import * as fs from "fs";
import * as path from "path";
import * as write from "write-json-file";
import { Bps } from "./types/validate.eosn.io/bps";

async function getBps(chain = "mainnet") {
    const request = await axios.get<Bps>(`https://validate.eosnation.io/${chain}/bps.json`);
    return request.data
}

async function download(chain = "mainnet") {
    const bps = await getBps(chain);
    const accounts = [];
    for (const producer of bps.producers) {
        if (!producer.info.vote_percent) continue;
        if (producer.info.vote_percent < 0.50) continue;
        if (!producer.input) continue;
        accounts.push(producer.input.producer_account_name);
    }
    // Check if file already exists
    if (chain === "mainnet") chain = "eos"
    const target = path.join(__dirname, "..", "json", chain, "system", "block-producer.json");
    write.sync(target, accounts);
}

download("mainnet")
download("bos")