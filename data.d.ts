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
    genesis: Dataset;
    eosio: Dataset;
    [subCategory: string]: Dataset;
}

// EOS Data
export interface EOS {
    dapps: DApps;
    exchanges: Exchanges;
    system: System;
    [category: string]: DApps|Exchanges|System;
}

// Global Data
export interface Data {
    eos: EOS;
}

export const eos: EOS;
