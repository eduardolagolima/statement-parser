import minimist from "minimist";
import { EOL } from "node:os";

import { templates } from "./templates";

type Templates = keyof typeof templates;

type Args = {
  _: [string];
  template: Templates;
};

const validateTemplate = (template: Templates) => {
  if (template === undefined) {
    throw new Error("Template não informado como argumento: --template");
  }

  const templateNames = Object.keys(templates);

  if (templateNames.includes(template) === false) {
    throw new Error(
      `Template inválido, opções válidas: ${EOL}- ${templateNames.join(
        `${EOL}- `
      )}`
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
    template,
  } = minimist<Args>(process.argv.slice(2));

  validateTemplate(template);
  validateFilePath(filePath);

  return {
    template,
    filePath,
  };
};
