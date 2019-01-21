type Dataset = string[];

interface Datasets {
    blacklist: Dataset;
    dapps: Dataset;
    dex: Dataset;
    exchange: Dataset;
    gambling: Dataset;
    genesis: Dataset;
    system: Dataset;
    [key: string]: Dataset
}
export default Datasets