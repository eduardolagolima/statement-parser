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
    { search: "JUROS S/CAPITAL", replace: "JCP" },
    { search: "RENDIMENTO", replace: "Rendimentos" },
    { search: "DIVIDENDOS", replace: "Dividendos" },
    { search: "CRÉDITO FRAÇÕES", replace: "Crédito de frações" },

    // remove informação desnecessária dos FIIS
    { search: "PAPEL", replace: "" },

    // remove a quantidade e substitui por um ponto e vírgula
    { search: `${space}+\\d*${space}+`, replace: ";" },
  ],
};
