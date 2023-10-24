import {
  newEmployeeForm,
  formOptionsContainer,
  filterOptionsContainer,
} from "./elements.js";
import { departments, roles, skillOptions } from "./firebase.js";

export const loadRoles = () => {
  newEmployeeForm[
    "role"
  ].innerHTML = `<option value="" selected disabled>Select a role</option>`;
  for (let role of roles.sort()) {
    newEmployeeForm[
      "role"
    ].innerHTML += `<option value="${role}">${role}</option>`;
  }
};

export const loadDepartments = () => {
  newEmployeeForm["department"].innerHTML = `<option value="" selected disabled>
    Select a department
  </option>`;
  for (let department of departments.sort()) {
    newEmployeeForm[
      "department"
    ].innerHTML += `<option value="${department}">${department}</option>`;
  }
};

export const loadSkills = () => {
  formOptionsContainer.innerHTML = "";
  filterOptionsContainer.innerHTML = "";
  for (let skill of skillOptions.sort()) {
    formOptionsContainer.innerHTML += `<label class="form-options flex"
        ><input
          id="form-${skill}"
          class="form-checkbox"
          type="checkbox"
          value="${skill}"
        />${skill}</label
      >`;
    filterOptionsContainer.innerHTML += `<label class="filter-options flex"
        ><input
          id="${skill}"
          class="filter-checkbox"
          type="checkbox"
          value="${skill}"
        />${skill}</label
      >`;
  }
};
