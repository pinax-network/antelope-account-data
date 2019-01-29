// Simple dataset which only contain the account name
export type Dataset = string[];

// Dapps
export interface DApps<T = Dataset> {
    account: T;
    gambling: T;
    games: T;
    namebid: T;
    resources: T;
    social: T;
    candy: T;
    [subCategory: string]: T;
}

// Exchanges
export interface Exchanges<T = Dataset> {
    cex: T;
    dex: T;
    [subCategory: string]: T;
}

// System Datasets
export interface System<T = Dataset> {
    blacklist: T;
    bpay: T;
    vpay: T;
    eosio: T;
    genesis: T;
    names: T;
    ram: T;
    stake: T;
    ibc: T;
    [subCategory: string]: T;
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
