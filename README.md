# EOS Detective Datasets

## JSON

https://raw.githubusercontent.com/EOS-Nation/eos-detective-data/master/data.json

## Install

```bash
npm install eos-detective-data
```

## Example

```ts
import * as data from "eos-detective-data";

console.log(data.eos.exchanges.dex);
//=> [ 'newdexpocket', ... ]

console.log(data.eos.system.blacklist);
//=> [ 'blacklistmee', ... ]
```
