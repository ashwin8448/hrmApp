import { displayTable } from "./displayTable.js";
import {
  deleteModal,
  selectedSkills,
  filterOptionsContainer,
  newEmployeeForm,
  formOptionsContainer,
  selectedSkillsContainer,
  formSelectedSkills,
  filterSearch,
} from "./elements.js";
import {
  idToDelete,
  setState,
  state,
  setSortIcon,
  setIdToDelete,
  employeeSkillsArray,
} from "./state.js";
import { filterArray } from "./filter.js";
import {
  blankValidation,
  emailValidation,
  phoneValidation,
  nameValidation,
} from "./formValidation.js";
import { toastHandler } from "./toast.js";
import {
  createEmployee,
  deleteEmployee,
  employees,
  updateEmployee,
  updateLastId,
} from "./firebase.js";
import { loadFilteredSkills, removeOverlay } from "./util.js";

export const deleteHandler = (e) => {
  if (
    e.target.tagName === "BUTTON" ||
    e.target.parentElement.tagName === "BUTTON"
  ) {
    if (e.target.value === "yes") {
      deleteEmployee(idToDelete);
      toastHandler(`Employee ID ${idToDelete} deleted.`);
    }
    deleteModal.classList.remove("open");
    removeOverlay();
    setIdToDelete(-1);
  }
};

export const sortHandler = (e) => {
  let sortColumn = e.target.closest(".column-header");
  let key = sortColumn.dataset.storageKey;
  let openSortIcon = document.querySelector(".sort-icon.open");
  openSortIcon.classList.toggle("open");
  sortColumn.querySelector(".sort-icon").classList.toggle("open");
  setState("sortBy", key);
  setSortIcon(openSortIcon);
  displayTable(employees);
};

const clearFilter = () => {
  filterSearch.value="";
  loadFilteredSkills("","filter")
  selectedSkillsContainer.classList.remove("open");
  selectedSkills.innerHTML = "";
  for (let checkbox of document.querySelectorAll(".filter-checkbox")) {
    checkbox.checked = false;
  }
  state.filterBy.skills.splice(0, state.filterBy.skills.length);
};

export const addSkillHandler = (e) => {
  let target = e.target;
  //To identify the skills added by user
  if (target.classList.contains("form-checkbox")) {
    if (!employeeSkillsArray.includes(target.value)) {
      formSelectedSkills.innerHTML += `<div class="selected-skill-button flex" data-form-skill="${target.value}">
            <span>${target.value}</span>
            <button type="button" class="skill-close"><img data-form-skill="${target.value}" src="./assets/images/close_button_icon.svg" alt="close icon"></button>
            </div>`;
      employeeSkillsArray.push(target.value);
    } else {
      formSelectedSkills.removeChild(
        formSelectedSkills.querySelector(
          `.selected-skill-button[data-form-skill="${target.value}"]`
        )
      );
      employeeSkillsArray.splice(employeeSkillsArray.indexOf(target.value), 1);
    }
  }
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
    displayTable(employees);
  }

  //To identify the filters applied by user
  else {
    if (target.classList.contains("filter-checkbox")) {
      if (!state.filterBy.skills.includes(target.value)) {
        selectedSkillsContainer.classList.add("open");
        selectedSkills.innerHTML += `<div class="selected-skill-button flex" data-skill="${target.value}">
            <span>${target.value}</span>
            <button type="button" class="skill-close"><img data-skill="${target.value}" src="./assets/images/close_button_icon.svg" alt="close icon"></button>
            </div>`;
        state.filterBy.skills.push(target.value);
      } else {
        selectedSkills.removeChild(
          selectedSkills.querySelector(
            `.selected-skill-button[data-skill="${target.value}"]`
          )
        );
        state.filterBy.skills.splice(
          state.filterBy.skills.indexOf(target.value),
          1
        );
      }
    }
    if (state.filterBy.skills.length == 0)   selectedSkillsContainer.classList.remove("open");
    displayTable(employees);
  }
};

export const addNewEmployeeHandler = (id, mode) => {
  let tempEmployee = {};
  tempEmployee.id = String(id);
  tempEmployee.fname = newEmployeeForm["fname"].value;
  tempEmployee.lname = newEmployeeForm["lname"].value;
  tempEmployee.dob = newEmployeeForm["dob"].value;
  tempEmployee.address = newEmployeeForm["address"].value;
  tempEmployee.phone = newEmployeeForm["phone"].value;
  tempEmployee.email = newEmployeeForm["email"].value;
  tempEmployee.doj = newEmployeeForm["doj"].value;
  tempEmployee.department = newEmployeeForm["department"].value;
  tempEmployee.role = newEmployeeForm["role"].value;
  tempEmployee.skills = employeeSkillsArray;
  if (mode == "new") {
    createEmployee(tempEmployee, tempEmployee.id);
    let tempIdObj = {};
    tempIdObj.lastId = id;
    updateLastId(tempIdObj);
  } else {
    updateEmployee(tempEmployee, tempEmployee.id);
  }
  employeeSkillsArray.splice(0, employeeSkillsArray.length);
};

export const validationHandler = (e) => {
  if (e.target.dataset.type) {
    try {
      blankValidation(e.target.value);
      switch (e.target.dataset.type) {
        case "name":
          nameValidation(e.target.value);
          break;
        case "phone":
          phoneValidation(e.target.value);
          break;
        case "email":
          emailValidation(e.target.value);
          break;
      }
      e.target.nextElementSibling.classList.remove("open");
    } catch (error) {
      e.target.nextElementSibling.classList.add("open");
      e.target.nextElementSibling.innerHTML = error;
    }
  }
};
