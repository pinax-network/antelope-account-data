export type Dataset = string[];

export interface Dapps {
    "account-creation": Dataset;
    collectibles: Dataset;
    gambling: Dataset;
    games: Dataset;
    marketplaces: Dataset;
    namebid: Dataset;
    resources: Dataset;
    social: Dataset;
    "token-distribution": Dataset;
}

export interface Exchanges {
    cex: Dataset;
    dex: Dataset;
}

// Complex Datasets
export const exchange: Exchanges;
export const dapps: Dapps;

// Simple Datasets
export const blacklist: Dataset;
export const genesis: Dataset;
export const system: Dataset;