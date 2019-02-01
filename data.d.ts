// Simple dataset which only contain the account name
export type Dataset = string[];

export interface Token {
    name:        string;
    account:     string;
    symbol:      string;
    precision:   number;
    logo:        string;
    website:     string;
    desc:        Description | string;
    links:       Links;
    whitepaper:  string;
}

export interface Description {
    en:  string;
    [language: string]: string;
}

export interface Links {
    twitter:  string;
    telegram: string;
    medium:   string;
    facebook: string;
    reddit:   string;
    github:   string;
    steemit:  string;
    wechat:   string;
    [link: string]: string;
}

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
    tokens: Token[];
    [category: string]: DApps | Exchanges | System | Token[];
}

// Blockchain
export interface Blockchains {
    eos: EOS;
    [blockchain: string]: any
}

export const eos: EOS;
