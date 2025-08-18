export const SORT_BY = [
  { key: "name-asc", label: "Name (A-Z)" },
  { key: "name-desc", label: "Name (Z-A)" },
  { key: "id-asc", label: "Dex No (1-151)" },
  { key: "id-desc", label: "Dex No (151-1)" },
];

export const sortMapping = {
  "name-asc": { name: "asc" },
  "name-desc": { name: "desc" },
  "id-asc": { id: "asc" },
  "id-desc": { id: "desc" },
};
