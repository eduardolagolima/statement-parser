import * as fs from "node:fs/promises";

import { configs } from "./configs";
import { Parser } from "./parser";
import { getArgs } from "./args";

(async function main() {
  try {
    const { broker, filePath } = getArgs();
    const config = configs[broker];
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" });
    const output = new Parser(fileContent, config)
      .removeHeader()
      .removeRows()
      .replaceValues()
      .reorderColumns()
      .parse();

    console.log(output);
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
})();
