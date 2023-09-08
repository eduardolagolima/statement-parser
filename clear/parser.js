const fs = require("fs/promises");
const { EOL } = require("os");

(async function main() {
  try {
    const input = await fs.readFile(__dirname + "/statement.csv", {
      encoding: "utf8",
    });
    const output = input
      .split(EOL)
      .filter((row, index) => {
        return (
          row && // remove qualquer linha vazia
          index > 0 && // remove o cabeçalho
          !row.includes("NOTA") &&
          !row.includes("TED")
        );
      })
      .map((row) => {
        const modifiedRow = row
          // corrige nomenclaturas
          .replace("JUROS S/CAPITAL", "JCP")
          .replace("RENDIMENTO", "Rendimentos")
          .replace("DIVIDENDOS", "Dividendos")
          .replace("CRÉDITO FRAÇÕES", "Crédito de frações")

          // remove informação desnecessária dos FIIS
          .replace("PAPEL", "")

          // remove a quantidade e substitui por um ponto e vírgula
          .replace(/\s+\d*\s+/, ";");

        const [dataOperacao, dataLiquidacao, valor, evento, ativo, saldoFinal] =
          modifiedRow.split(";");

        const tipo = "";
        const moeda = "Real";

        return `${dataOperacao};${ativo};${evento};${tipo};${moeda};${valor}`;
      })
      .join(EOL);

    console.log(`Entrada: ${EOL}${EOL}${input}`);
    console.log(
      `Saída: (Linhas = ${
        output.split(EOL).length
      }) ${EOL}${EOL}${output}${EOL}`
    );
  } catch (err) {
    console.log(err);
  }
})();
