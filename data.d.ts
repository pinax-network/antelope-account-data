// Simple dataset which only contain the account name
export type Dataset = string[];

// Dapps
export interface DApps {
    account: Dataset;
    collectibles: Dataset;
    gambling: Dataset;
    games: Dataset;
    marketplaces: Dataset;
    namebid: Dataset;
    resources: Dataset;
    social: Dataset;
    candy: Dataset;
    [category: string]: Dataset;
}

// Exchanges
export interface Exchanges {
    cex: Dataset;
    dex: Dataset;
    [category: string]: Dataset;
}

// System Datasets
export interface System {
    blacklist: Dataset;
    genesis: Dataset;
    system: Dataset;
    [category: string]: Dataset;
}

// EOS Data
export interface EOS {
    dapps: DApps;
    exchanges: Exchanges;
    system: System;
}

export const eos: EOS;
