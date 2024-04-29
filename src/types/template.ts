type SearchAndReplace = {
  search: RegExp;
  replace: string;
};

export type Template = {
  currency: "Real" | "Dólar";
  inputColumns: string[];
  outputColumns: string[];
  type: string;
  valuesToRemove: string[];
  valuesToReplace: SearchAndReplace[];
};
