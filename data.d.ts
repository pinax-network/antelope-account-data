// Simple dataset which only contain the account name
export type Dataset = string[];

// Dapps
export interface DApps {
    account: Dataset;
    gambling: Dataset;
    games: Dataset;
    namebid: Dataset;
    resources: Dataset;
    social: Dataset;
    candy: Dataset;
    [subCategory: string]: Dataset;
}

// Exchanges
export interface Exchanges {
    cex: Dataset;
    dex: Dataset;
    [subCategory: string]: Dataset;
}

// System Datasets
export interface System {
    blacklist: Dataset;
    "block-producer": Dataset;
    "bp-pay": Dataset;
    eosio: Dataset;
    genesis: Dataset;
    names: Dataset;
    ram: Dataset;
    stake: Dataset;
    [subCategory: string]: Dataset;
}

// EOS Data
export interface EOS {
    dapps: DApps;
    exchanges: Exchanges;
    system: System;
    [category: string]: DApps | Exchanges | System;
}

// Blockchain
export interface Blockchains {
    eos: EOS;
    [blockchain: string]: any
}

export const eos: EOS;
