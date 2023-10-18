import { sortEmployees } from "./sort.js";
import { filterEmployees, filteredEmployees } from "./filter.js";
import { renderTable } from "./renderTable.js";
import { pagination, setTotalPages } from "./state.js";
import { pageCustomInput, totalPages } from "./elements.js";

export const displayTable = () => {
  filterEmployees();
  setTotalPages(filteredEmployees.length);
  if (Number(pageCustomInput.value) > pagination.totalPages) {
    pageCustomInput.value = pagination.totalPages;
  }
  sortEmployees();
  totalPages.previousElementSibling.setAttribute(
    "max",
    `${pagination.totalPages}`
  );
  totalPages.innerHTML = ` of ${pagination.totalPages} pages`;
  renderTable();
};
