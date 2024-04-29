type SearchAndReplace = {
  search: string | RegExp;
  replace: string;
};

export type Template = {
  columns: string[];
  currency: "Real" | "Dólar";
  outputColumns: string[];
  type: string;
  valuesToRemove: string[];
  valuesToReplace: SearchAndReplace[];
};
