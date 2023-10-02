import * as fs from "node:fs/promises";

import { configs } from "./configs";
import { Parser } from "./parser";
import { getArgs } from "./args";

(async function main() {
  try {
    const { broker, filePath } = getArgs();
    const config = configs[broker];
    const input = await fs.readFile(filePath, { encoding: "utf8" });
    const output = new Parser(input)
      .removeHeader()
      .removeLines(config.valuesToRemove)
      .replaceValues(config.valuesToReplace)
      .reorderColumns(config.columns, config.outputColumns)
      .generateOutput();

    console.log("");
    console.log("Entrada:");
    console.log("");
    console.log(input);
    console.log("");
    console.log("Saída:");
    console.log("");
    console.log(output);
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
})();
