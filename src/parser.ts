import { Template } from "./types/template";
import { EOL } from "node:os";

export class Parser {
  private rows: string[] = [];
  private removedRows: string[] = [];

  public constructor(private fileContent: string, private template: Template) {
    this.fileContent = fileContent.trim();
    this.rows = this.fileContent.split(EOL);
  }

  public removeHeader() {
    this.removedRows.push(this.rows[0]);

    this.rows.shift();

    return this;
  }

  public removeRows() {
    this.rows = this.rows.filter((row) => {
      const mustRemove = row.match(this.template.valuesToRemove.join("|"));

      if (mustRemove) {
        this.removedRows.push(row);
      }

      return !mustRemove;
    });

    return this;
  }

  public replaceValues() {
    this.rows = this.rows.map((row) => {
      this.template.valuesToReplace.forEach(({ search, replace }) => {
        row = row.replace(new RegExp(search, "g"), replace);
      });

      return row;
    });

    return this;
  }

  public reorderColumns() {
    const pattern = this.template.columns
      .reduce<string[]>((pattern, column) => {
        return [...pattern, `(?<${column}>.+)`];
      }, [])
      .join(";");

    const replaceValue = this.template.outputColumns
      .reduce<string[]>((replaceValue, outputColumn) => {
        return [...replaceValue, outputColumn];
      }, [])
      .join(";");

    this.rows = this.rows.map((row) => {
      return row.replace(RegExp(pattern, "g"), replaceValue);
    });

    return this;
  }

  public parse() {
    const initialRowsAmount = this.fileContent.split(EOL).length;
    const removedRowsAmount = this.removedRows.length;
    const consideredRowsAmount = this.rows.length;
    const balanceAmount =
      initialRowsAmount - removedRowsAmount - consideredRowsAmount;

    return `
Entrada:

${this.fileContent}

Linhas removidas:

${this.removedRows.join(EOL)}

Linhas consideradas:

${this.rows.join(EOL)}

Resumo das quantidades de linhas:

Entrada: ${initialRowsAmount}
Linhas removidas: ${removedRowsAmount}
Linhas consideradas: ${consideredRowsAmount}
Conferência: ${balanceAmount}
    `;
  }
}
