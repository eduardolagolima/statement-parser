import { Template } from "../types/template";

enum InputColumns {
  dataOperacao = "dataOperacao",
  hora = "hora",
  dataLiquidacao = "dataLiquidacao",
  evento = "evento",
  ativo = "ativo",
  valor = "valor",
  saldoFinal = "saldoFinal",
}

export const avenue: Template = {
  inputColumns: Object.values(InputColumns),
  outputColumns: [
    `$<${InputColumns.dataOperacao}>`,
    `$<${InputColumns.ativo}>`,
    `$<${InputColumns.evento}>`,
    `$<${InputColumns.valor}>`,
  ],
  valuesToRemove: [
    "Câmbio Padrão",
    "Compra de",
    "Estorno Impostos sobre Dividendos",
  ],
  valuesToReplace: [
    // corrige nomenclaturas
    { search: /Retenção Impostos sobre Dividendos/, replace: "Impostos;" },
    { search: /Dividendos/, replace: "Dividendos;" },

    // remove espaços
    { search: /\s+/, replace: "" },

    // remove asteriscos do nome das ADRs
    { search: /\*+/, replace: "" },

    // extrai o código do ativo
    { search: /([A-Z]+)\.[A-Z&-]+/, replace: "$1" },

    // troca todos os pontos por vírgula
    { search: /\./, replace: "," },
  ],
};
