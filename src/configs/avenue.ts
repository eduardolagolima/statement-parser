import { Config } from "../types/config";

enum Columns {
  dataOperacao = "dataOperacao",
  hora = "hora",
  dataLiquidacao = "dataLiquidacao",
  evento = "evento",
  ativo = "ativo",
  valor = "valor",
  saldoFinal = "saldoFinal",
}

const currency: Config["currency"] = "Dólar";
const type: Config["type"] = "?";

export const avenue: Config = {
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
  valuesToRemove: ["Câmbio Padrão", "Compra de"],
  valuesToReplace: [
    // corrige nomenclaturas
    {
      searchValue: "Retenção Impostos sobre Dividendos",
      replaceValue: "Impostos",
    },

    // simplifica o nome do ativo
    { searchValue: "\\s([A-Z]+)\\.[A-Z\\s&*-]+", replaceValue: ";$1" },

    // troca todos os pontos por vírgula
    { searchValue: "\\.", replaceValue: "," },
  ],
};
