import * as fs from "node:fs/promises";

import { getArgs } from "./args";
import { Parser } from "./parser";
import { templates } from "./templates";

(async function main() {
  try {
    const { template, filePath } = getArgs();
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" });
    const output = new Parser(fileContent, templates[template])
      .validateFile()
      .standardizeFile()
      .generateRows()
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
