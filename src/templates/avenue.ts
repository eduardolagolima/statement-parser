import type { Template } from "../types/template";

enum InputColumns {
  dataTransacao = "dataTransacao",
  dataLiquidacao = "dataLiquidacao",
  evento = "evento",
  ativo = "ativo",
  valor = "valor",
  saldo = "saldo",
}

export const avenue: Template = {
  expectedHeader: "Data transação,Data liquidação,Descrição,Valor,Saldo",
  inputColumns: Object.values(InputColumns),
  outputColumns: [
    InputColumns.dataTransacao,
    InputColumns.ativo,
    InputColumns.evento,
    InputColumns.valor,
  ],
  valuesToRemove: [
    "Câmbio de real para dólar",
    "Compra",
    "Estorno de imposto sobre dividendo",
    "Imposto sobre ADR",
    "Ajuste Campanha",
  ],
  valuesToReplace: [
    // corrige nomenclaturas
    { search: /Imposto sobre dividendo de /, replace: "Impostos;" },
    { search: /Dividendos de /, replace: "Dividendos;" },
  ],
};
