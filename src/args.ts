import minimist from "minimist";

import { configs } from "./configs";

type Args = {
  _: [string];
  broker: Brokers;
};

type Brokers = keyof typeof configs;

const validateBroker = (broker: Brokers) => {
  if (broker === undefined) {
    throw new Error("Corretora não informada como argumento: --broker");
  }

  const brokers = Object.keys(configs);

  if (brokers.includes(broker) === false) {
    throw new Error(
      `Corretora inválida, opções válidas: ${brokers.join(" | ")}`
    );
  }
};

const validateFilePath = (filePath: string) => {
  if (filePath === undefined) {
    throw new Error("Caminho do arquivo não informado");
  }
};

export const getArgs = () => {
  const {
    _: [filePath],
    broker,
  } = minimist<Args>(process.argv.slice(2));

  validateBroker(broker);
  validateFilePath(filePath);

  return {
    broker,
    filePath,
  };
};
