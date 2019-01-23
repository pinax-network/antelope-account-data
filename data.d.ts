// Simple dataset which only contain the account name
export type Dataset = string[];

export interface Data {
    dapps: DApps;
    exchanges: Exchanges;
    system: System;
}

// Dapps
export interface DApps {
    account_creation: Dataset;
    collectibles: Dataset;
    gambling: Dataset;
    games: Dataset;
    marketplaces: Dataset;
    namebid: Dataset;
    resources: Dataset;
    social: Dataset;
    token_distribution: Dataset;
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

// Datasets
export const exchange: Exchanges;
export const dapps: DApps;
export const system: System;
