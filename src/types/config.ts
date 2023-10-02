type SearchAndReplace = {
  searchValue: string;
  replaceValue: string;
};

export type Config = {
  columns: string[];
  currency: "Real" | "Dólar";
  outputColumns: string[];
  type: string;
  valuesToRemove: string[];
  valuesToReplace: SearchAndReplace[];
};
