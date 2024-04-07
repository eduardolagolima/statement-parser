import { Template } from "../types/template";

enum Columns {
  dataOperacao = "dataOperacao",
  hora = "hora",
  dataLiquidacao = "dataLiquidacao",
  evento = "evento",
  ativo = "ativo",
  valor = "valor",
  saldoFinal = "saldoFinal",
}

const currency: Template["currency"] = "Dólar";
const type: Template["type"] = "?";

export const avenue: Template = {
  columns: Object.values(Columns),
  currency: "Dólar",
  outputColumns: [
    `$<${Columns.dataOperacao}>`,
    `$<${Columns.ativo}>`,
    `$<${Columns.evento}>`,
    type,
    currency,
    `$<${Columns.valor}>`,
  ],
  type: "?",
  valuesToRemove: [
    "Câmbio Padrão",
    "Compra de",
    "Estorno Impostos sobre Dividendos",
  ],
  valuesToReplace: [
    // corrige nomenclaturas
    { search: "Retenção Impostos sobre Dividendos", replace: "Impostos;" },
    { search: "Dividendos", replace: "Dividendos;" },

    // remove espaços
    { search: "\\s+", replace: "" },

    // remove asteriscos do nome das ADRs
    { search: "\\*+", replace: "" },

    // extrai o código do ativo
    { search: "([A-Z]+)\\.[A-Z&-]+", replace: "$1" },

    // troca todos os pontos por vírgula
    { search: "\\.", replace: "," },
  ],
};
