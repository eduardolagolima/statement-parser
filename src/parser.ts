import { Config } from "./types/config";

const LINE_BREAK = "(?:\r\n|\n|\r)";

export class Parser {
  constructor(private input: string) {}

  public removeHeader() {
    this.input = this.input.replace(new RegExp(`^.+${LINE_BREAK}`), "");

    return this;
  }

  public removeLines(valuesToRemove: Config["valuesToRemove"]) {
    const pattern = `.+(?:${valuesToRemove.join("|")}).+${LINE_BREAK}`;

    this.input = this.input.replace(new RegExp(pattern, "g"), "");

    return this;
  }

  public replaceValues(valuesToReplace: Config["valuesToReplace"]) {
    valuesToReplace.forEach(({ searchValue, replaceValue }) => {
      this.input = this.input.replace(
        new RegExp(searchValue, "g"),
        replaceValue
      );
    });

    return this;
  }

  public reorderColumns(
    columns: Config["columns"],
    outputColumns: Config["outputColumns"]
  ) {
    const pattern = columns
      .reduce<string[]>((pattern, column) => {
        return [...pattern, `(?<${column}>.+)`];
      }, [])
      .join(";");

    const replaceValue = outputColumns
      .reduce<string[]>((replaceValue, outputColumn) => {
        return [...replaceValue, outputColumn];
      }, [])
      .join(";");

    this.input = this.input.replace(RegExp(pattern, "g"), replaceValue);

    return this;
  }

  public generateOutput() {
    return this.input;
  }
}
