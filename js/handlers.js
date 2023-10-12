import { displayTable } from "./displayTable.js";
import { employees, setEmployees } from "./firebase.js";
import {
  deleteModal,
  overlay,
  selectedSkills,
  filterOptionsContainer,
  checkboxes,
  newEmployee,
} from "./elements.js";
import { idToDelete, setState, state, setSortIcon } from "./state.js";
import { filterEmployees } from "./filter.js";

export const deleteHandler = (e) => {
  if (
    (e.target.tagName === "BUTTON" ||
      e.target.parentElement.tagName === "BUTTON") &&
    e.target.value === "yes"
  ) {
    setEmployees(employees.filter((employee) => employee.id !== idToDelete));
    localStorage.setItem("employees", JSON.stringify(employees));
    displayTable();
  }
  deleteModal.classList.remove("open");
  overlay.classList.remove("open");
};

export const sortHandler = (e) => {
  let sortColumn = e.target.closest(".column-header");
  let key = sortColumn.dataset.storageKey;
  let openSortIcon = document.querySelector(".sort-icon.open");
  openSortIcon.classList.toggle("open");
  sortColumn.querySelector(".sort-icon").classList.toggle("open");
  setState("sortBy", key);
  setSortIcon(openSortIcon);
  displayTable();
};

const clearFilter = () => {
  selectedSkills.innerHTML = "";
  for (let checkbox of checkboxes) {
    checkbox.checked = false;
  }
  state.filterBy.skills.splice(0, state.filterBy.skills.length);
};

export const filterHandler = (e) => {
  let target = e.target;
  //To open custom dropdown
  if (e.target.classList.contains("filter-search")) {
    filterOptionsContainer.classList.add("open");
  }

  //To clear filter if click on clear filter
  else if (e.target.classList.contains("clear-filter-icon")) {
    filterOptionsContainer.classList.remove("open");
    clearFilter();
    displayTable();
  }

  //To identify the filters applied by user
  else {
    if (target.classList.contains("filter-checkbox")) {
      if (!state.filterBy.skills.includes(target.value)) {
        selectedSkills.innerHTML += `<div class="selected-skill-button ${target.value} flex">
            <span>${target.value}</span>
            <button type="button" class="skill-close"><img data-skill="${target.value}" src="./assets/images/skill_close_icon.svg" alt=""></button>
            </div>`;
        state.filterBy.skills.push(target.value);
      } else {
        selectedSkills.removeChild(
          document.querySelector(`.selected-skill-button.${target.value}`)
        );
        state.filterBy.skills.splice(
          state.filterBy.skills.indexOf(target.value),
          1
        );
      }
    }
    if (state.filterBy.skills.length == 0) {
      clearFilter();
    } else filterEmployees();
    displayTable();
  }
};

export const addNewEmployeeHandler = (e) => {
  e.preventDefault();
  let tempEmployee = {};
  tempEmployee.id = 1007;
  tempEmployee.name = newEmployee["fname"].value + newEmployee["fname"].value;
  tempEmployee.dateOfBirth = newEmployee["dob"].value;
  tempEmployee.address = newEmployee["address"].value;
  tempEmployee.phone = newEmployee["phone"].value;
  tempEmployee.email = newEmployee["email"].value;
  tempEmployee.dateOfJoining = newEmployee["doj"].value;
  tempEmployee.department = newEmployee["department"].value;
  tempEmployee.role = newEmployee["role"].value;
  setEmployees([...employees, ...[tempEmployee]]);
  localStorage.setItem("employees", JSON.stringify(employees));
  displayTable();
};
