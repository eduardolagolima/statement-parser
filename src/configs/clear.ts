import { Config } from "../types/config";

enum Columns {
  dataOperacao = "dataOperacao",
  dataLiquidacao = "dataLiquidacao",
  valor = "valor",
  evento = "evento",
  ativo = "ativo",
  saldoFinal = "saldoFinal",
}

const currency: Config["currency"] = "Real";
const type: Config["type"] = "?";
const space = " ";

export const clear: Config = {
  columns: Object.values(Columns),
  currency: "Real",
  outputColumns: [
    `$<${Columns.dataOperacao}>`,
    `$<${Columns.ativo}>`,
    `$<${Columns.evento}>`,
    type,
    currency,
    `$<${Columns.valor}>`,
  ],
  type: "?",
  valuesToRemove: ["NOTA", "TED"],
  valuesToReplace: [
    // corrige nomenclaturas
    { searchValue: "JUROS S/CAPITAL", replaceValue: "JCP" },
    { searchValue: "RENDIMENTO", replaceValue: "Rendimentos" },
    { searchValue: "DIVIDENDOS", replaceValue: "Dividendos" },
    { searchValue: "CRÉDITO FRAÇÕES", replaceValue: "Crédito de frações" },

    // remove informação desnecessária dos FIIS
    { searchValue: "PAPEL", replaceValue: "" },

    // remove a quantidade e substitui por um ponto e vírgula
    { searchValue: `${space}+\\d*${space}+`, replaceValue: ";" },
  ],
};
