export interface TheRest {
    success: boolean;
    error:   null;
    data:    Data;
}

export interface Data {
    pageCount: number;
    list:      List[];
}

export interface List {
    protocols:                Protocol[];
    id:                       number;
    balance:                  number;
    author:                   string;
    disabled:                 string;
    title:                    string;
    description:              string;
    description_render:       string;
    url:                      string;
    deeplink:                 null | string;
    category:                 string;
    contractsCount:           number;
    featured:                 number;
    hourlyDauGraphUrl:        string;
    volumeLastDay:            number;
    volumeLastWeek:           number;
    volume24hChange:          string;
    txLastDay:                number;
    txLastWeek:               number;
    dauLastDay:               number;
    dauLastWeek:              string;
    weeklyUsers:              string;
    dau24hChange:             string;
    logo:                     null | string;
    icon:                     null | string;
    video:                    null | string;
    updatedAt:                string;
    createdAt:                string;
    nsfw:                     number;
    volumeLastDayInUSD:       number;
    volumeLastWeekInUSD:      number;
    volumeLastDayLabel:       string;
    volumeLastWeekLabel:      string;
    volumeLastDayInUSDLabel:  string;
    volumeLastWeekInUSDLabel: string;
    balanceLabel:             string;
    txLastDayLabel:           string;
    txLastWeekLabel:          string;
    dauLastDayLabel:          string;
    slug:                     string;
    isNew:                    boolean;
    changes:                  Changes;
    rankings:                 Rankings;
}

export enum Category {
    Collectibles = "collectibles",
    Exchanges = "exchanges",
    Gambling = "gambling",
    Games = "games",
    HighRisk = "high-risk",
    Marketplaces = "marketplaces",
    Other = "other",
}

export interface Changes {
    dau: Dau;
    vol: Dau;
}

export interface Dau {
    status: Status;
    label:  string;
}

export enum Status {
    Negative = "negative",
    Neutral = "neutral",
    Positive = "positive",
}

export enum Protocol {
    EOS = "eos",
    Eth = "eth",
    TRON = "tron",
}

export interface Rankings {
    overall:  number;
    category: number;
}
