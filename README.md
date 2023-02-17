# Antelope Account Datasets

## Install

```bash
$ npm install git+ssh://git@github.com/pinax-network/antelope-account-data.git
```

## Example

```ts
(async () => {
    const response = await fetch("https://raw.githubusercontent.com/pinax-network/antelope-account-data/master/data.json");
    const data = await response.json();

    console.log(data.eos.exchanges.dex);
    //=> [ 'newdexpocket', ... ]

    console.log(data.eos.system.blacklist);
    //=> [ 'blacklistmee', ... ]
})();
```
