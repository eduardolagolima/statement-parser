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
          !row.includes("Câmbio Padrão") &&
          !row.includes("Compra de")
        );
      })
      .map((row) => {
        const modifiedRow = row
          // corrige nomenclaturas
          .replace("Retenção Impostos sobre Dividendos", "Impostos")

          // simplifica o nome do ativo
          .replace(/\s([A-Z]+)\.[A-Z\s&*]+/, ";$1")

          // troca todos os pontos por vírgula
          .replace(".", ",");

        const [
          dataOperacao,
          hora,
          dataLiquidacao,
          evento,
          ativo,
          valor,
          saldoFinal,
        ] = modifiedRow.split(";");

        const tipo = "";
        const moeda = "Dólar";

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
