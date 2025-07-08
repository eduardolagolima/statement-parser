# statement-parser

CLI para extrair os proventos dos extratos da Avenue e B3.

### Como instalar?

```sh
npm install
npm i -g .
```

### Exemplos de como usar:

```sh
statement-parser --template=avenue examples/avenue.csv
```

```sh
statement-parser --template=b3 examples/b3.csv
```

### Como exportar os extratos?

> **Avenue**: Relatórios > Avenue US > Extrato na conta de investimento > Período > Personalizar > Preencher filtros > Download do CSV

> **B3**: Proventos > Recebidos > Filtrar > Preencher Data inicial/final > Filtrar > Baixar > Arquivo em Excel para ser importado em planilhas > Importar no Google Planilhas > Baixar como CSV
