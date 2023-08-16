const fs = require('fs/promises');
const { EOL } = require('os');

(async function main() {
  try {
    const input = await fs.readFile(__dirname + '/statement.csv', { encoding: 'utf8' });
    const output = input
      .split(EOL)
      .filter((row, index) => {
        return (
          row && // remove qualquer linha vazia
          index > 0 && // remove o cabeçalho
          !row.includes('Câmbio Padrão') && 
          !row.includes('Compra de')
        );
      })
      .map((row) => {
        return row
          // corrige nomenclaturas
          .replace('Retenção Impostos sobre Dividendos', 'Impostos')
          .replace('Dividendos', 'Dividendos,')
          .replace('Impostos', 'Impostos,')

          // separa colunas
          .replace(
            /([0-9\/]+),([0-9\:]+),([0-9\/]+),(\w+),\s+(\w+)\.\s[*\w\s]+,(-?[\d\.]+),(-?[\d.]+)/,
            (match, ...groups) => {
              const [
                dataOperacao,
                hora,
                dataLiquidacao,
                evento,
                ativo,
                valor,
                saldoFinal
              ] = groups;

              const moeda = 'Dólar';

              return `${dataOperacao};${ativo};${evento};?;${moeda};${valor.replace('.', ',')}`;
            }
          )
      })
      .join(EOL);

    console.log(`Entrada: ${EOL}${EOL}${input}`);
    console.log(`Saída: (Linhas = ${output.split(EOL).length}) ${EOL}${EOL}${output}${EOL}`);

  } catch (err) {
    console.log(err);
  }
})();
