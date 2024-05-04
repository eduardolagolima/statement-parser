type SearchAndReplace = {
  search: RegExp;
  replace: string;
};

export type Template = {
  inputColumns: string[];
  outputColumns: string[];
  valuesToRemove: string[];
  valuesToReplace: SearchAndReplace[];
};
