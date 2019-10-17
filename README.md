# EOS Detective Datasets

## Install

```bash
$ npm install git+ssh://git@github.com/eosnationftw/eos-detective-data.git
```

## Example

```ts
import * as data from "eos-detective-data";

console.log(data.eos.exchanges.dex);
//=> [ 'newdexpocket', ... ]

console.log(data.eos.system.blacklist);
//=> [ 'blacklistmee', ... ]
```
