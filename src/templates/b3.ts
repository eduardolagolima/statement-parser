import { Template } from "../types/template";

enum InputColumns {
  ativo = "ativo",
  dataPagamento = "dataPagamento",
  evento = "evento",
  instituicao = "instituicao",
  quantidade = "quantidade",
  precoUnitario = "precoUnitario",
  valorLiquido = "valorLiquido",
}

export const b3: Template = {
  inputColumns: Object.values(InputColumns),
  outputColumns: [
    `$<${InputColumns.dataPagamento}>`,
    `$<${InputColumns.ativo}>`,
    `$<${InputColumns.evento}>`,
    `$<${InputColumns.valorLiquido}>`,
  ],
  valuesToRemove: [
    // Linhas do totalizador
    ";;;;;;",
  ],
  valuesToReplace: [
    // corrige nomenclaturas
    { search: /Juros Sobre Capital Próprio/, replace: "JCP" },
    { search: /Dividendo/, replace: "Dividendos" },
    { search: /Rendimento/, replace: "Rendimentos" },

    // remove espaços
    { search: /\s+/, replace: "" },

    // extrai o código do ativo
    { search: /([A-Z\d]{4}\d{1,2})[^;]+/, replace: "$1" },

    // troca todos os pontos por vírgula
    { search: /\./, replace: "," },
  ],
};
