type SearchAndReplace = {
  search: RegExp;
  replace: string;
};

export type Template = {
  expectedHeader: string;
  inputColumns: string[];
  outputColumns: string[];
  valuesToRemove: string[];
  valuesToReplace: SearchAndReplace[];
};
