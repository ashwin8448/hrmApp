import { sortEmployees } from "./sort.js";
import { filterEmployees, filteredEmployees } from "./filter.js";
import { renderTable } from "./renderTable.js";

export const displayTable = () => {
  filterEmployees();
  sortEmployees();
  renderTable();
};
