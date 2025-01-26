import type { Template } from "../types/template";

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
  expectedHeader:
    "Produto,Pagamento,Tipo de Evento,Instituição,Quantidade,Preço unitário,Valor líquido",
  inputColumns: Object.values(InputColumns),
  outputColumns: [
    InputColumns.dataPagamento,
    InputColumns.ativo,
    InputColumns.evento,
    InputColumns.valorLiquido,
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

    // extrai o código do ativo
    { search: /([A-Z\d]{4}\d{1,2})[^;]+/, replace: "$1" },
  ],
};
