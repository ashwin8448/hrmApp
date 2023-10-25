import { sortEmployees } from "./sort.js";
import { filterArray } from "./filter.js";
import { renderTable } from "./renderTable.js";
import { pagination, setTotalPages } from "./state.js";
import {
  loaderContainer,
  overlay,
  pageCustomInput,
  totalPages,
} from "./elements.js";

export const displayTable = (employees) => {
  loaderContainer.classList.remove("open");
  overlay.classList.remove("open");
  let filteredEmployees = filterArray(employees);
  setTotalPages(filteredEmployees.length);
  if (Number(pageCustomInput.value) > pagination.totalPages) {
    pageCustomInput.value = pagination.totalPages || 1;
  }
  let sortedEmployees = sortEmployees(filteredEmployees);
  totalPages.previousElementSibling.setAttribute(
    "max",
    `${pagination.totalPages}`
  );
  totalPages.innerHTML = ` of ${pagination.totalPages} pages`;
  renderTable(sortedEmployees);
};
