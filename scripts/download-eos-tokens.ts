import * as fs from "fs";
import * as path from "path";
import * as write from "write-json-file";

import tokens from "eos-tokens";

for (const token of tokens) {
    const target = path.join(__dirname, "..", "json", "eos", "tokens", token.account + ".json");
    write.sync(target, token)
}