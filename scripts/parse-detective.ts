const { data }  = require("./coinbase.json")

const accounts = new Set();
for ( const row of data ) {
    const from = row.from.split("/")[1];
    const to = row.to.split("/")[1];
    accounts.add(from);
    accounts.add(to);
}

console.log(JSON.stringify([...accounts], null, 2));