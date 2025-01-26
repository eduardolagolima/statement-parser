import type { Template } from "../types/template";

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
  expectedHeader:
    "Data,Hora,Liquidação,Descrição,Valor (U$),Saldo da conta (U$)",
  inputColumns: Object.values(InputColumns),
  outputColumns: [
    InputColumns.dataOperacao,
    InputColumns.ativo,
    InputColumns.evento,
    InputColumns.valor,
  ],
  valuesToRemove: [
    "Câmbio Padrão",
    "Compra de",
    "Estorno Impostos sobre Dividendos",
    "ADR Taxa",
    "AJUSTE",
  ],
  valuesToReplace: [
    // corrige nomenclaturas
    { search: /Retenção Impostos sobre Dividendos/, replace: "Impostos;" },
    { search: /Dividendos/, replace: "Dividendos;" },

    // extrai o código do ativo
    { search: /([A-Z]+)\.[^;]+/, replace: "$1" },
  ],
};
