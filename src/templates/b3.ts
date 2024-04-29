import { Template } from "../types/template";

enum Columns {
  ativo = "ativo",
  dataPagamento = "dataPagamento",
  evento = "evento",
  instituicao = "instituicao",
  quantidade = "quantidade",
  precoUnitario = "precoUnitario",
  valorLiquido = "valorLiquido",
}

const currency: Template["currency"] = "Real";
const type: Template["type"] = "?";

export const b3: Template = {
  columns: Object.values(Columns),
  currency,
  outputColumns: [
    `$<${Columns.dataPagamento}>`,
    `$<${Columns.ativo}>`,
    `$<${Columns.evento}>`,
    type,
    currency,
    `$<${Columns.valorLiquido}>`,
  ],
  type,
  valuesToRemove: [
    // Linhas do totalizador
    ";;;;;;",
  ],
  valuesToReplace: [
    // corrige nomenclaturas
    { search: "Juros Sobre Capital Próprio", replace: "JCP" },
    { search: "Dividendo", replace: "Dividendos" },
    { search: "Rendimento", replace: "Rendimentos" },

    // remove espaços
    { search: /\s+/, replace: "" },

    // extrai o código do ativo
    { search: /([A-Z\d]{4}\d{1,2})[^;]+/, replace: "$1" },

    // troca todos os pontos por vírgula
    { search: /\./, replace: "," },
  ],
};
