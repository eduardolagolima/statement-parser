import { EOL } from "node:os";
import { Template } from "./types/template";

export class Parser {
  private initialFileContent: string;
  private standardizedFileContent: string;
  private template: Template;
  private rows: string[];
  private removedRows: string[];

  public constructor(fileContent: string, template: Template) {
    this.initialFileContent = fileContent.trim();
    this.standardizedFileContent = "";
    this.template = template;
    this.rows = [];
    this.removedRows = [];
  }

  public validateFile() {
    if (!this.initialFileContent.includes(this.template.expectedHeader)) {
      throw new Error(
        "O cabeçalho do arquivo é inválido para o template informado"
      );
    }

    return this;
  }

  public standardizeFile() {
    this.standardizedFileContent = this.initialFileContent
      .replace(/"[^"]*"/g, (match) =>
        match
          // troca todas as vírgulas dentro de aspas duplas por ponto
          .replace(/,/g, ".")

          // remove as aspas duplas
          .replace(/"/g, "")
      )

      // troca todas as vírgulas por ponto e vírgula
      .replace(/,/g, ";")

      // troca tudo que tiver mais de 1 espaço para apenas 1 espaço
      .replace(/ {2,}/g, " ");

    return this;
  }

  public generateRows() {
    this.rows = this.standardizedFileContent.split(/\r?\n/);

    return this;
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
    const valuesToReplace = [
      ...this.template.valuesToReplace,

      // remove espaços
      { search: /\s+/, replace: "" },

      // troca todos os pontos por vírgula
      { search: /\./, replace: "," },

      // remove a formatação dos valores
      { search: /R\$/g, replace: "" },
    ];

    this.rows = this.rows.map((row) => {
      valuesToReplace.forEach(({ search, replace }) => {
        row = row.replace(new RegExp(search, "g"), replace);
      });

      return row;
    });

    return this;
  }

  public reorderColumns() {
    const search = this.template.inputColumns
      .reduce<string[]>((search, inputColumn) => {
        return [...search, `(?<${inputColumn}>.+)`];
      }, [])
      .join(";");

    const replace = this.template.outputColumns
      .reduce<string[]>((replace, outputColumn) => {
        return [...replace, `$<${outputColumn}>`];
      }, [])
      .join(";");

    this.rows = this.rows.map((row) => {
      return row.replace(new RegExp(search, "g"), replace);
    });

    return this;
  }

  public parse() {
    const initialRowsAmount = this.initialFileContent.split(EOL).length;
    const removedRowsAmount = this.removedRows.length;
    const consideredRowsAmount = this.rows.length;
    const balanceAmount =
      initialRowsAmount - removedRowsAmount - consideredRowsAmount;

    return `
Entrada:

${this.initialFileContent}

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
