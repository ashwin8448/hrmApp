import {
  newEmployeeForm,
  formOptionsContainer,
  filterOptionsContainer,
} from "./elements.js";
import { filterSkills } from "./filter.js";
import { departments, roles, skillOptions } from "./firebase.js";
import { state } from "./state.js";

export const loadRoles = () => {
  newEmployeeForm["role"].innerHTML = "";
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
  newEmployeeForm["department"].innerHTML = "";
  newEmployeeForm["department"].innerHTML = `<option value="" selected disabled>
    Select a department
  </option>`;
  for (let department of departments.sort()) {
    newEmployeeForm[
      "department"
    ].innerHTML += `<option value="${department}">${department}</option>`;
  }
};

export const loadSkills = (input = "", mode = "initial") => {
  formOptionsContainer.innerHTML = "";
  filterOptionsContainer.innerHTML = "";
  if (mode == "form" || mode == "initial") {
    console.log("Form");
    let filteredFormSkillOptions = filterSkills(skillOptions, input);
    for (let skill of filteredFormSkillOptions.sort()) {
      formOptionsContainer.innerHTML += `<label class="form-options flex"
      ><input
      id="form-option"
      class="form-checkbox"
      type="checkbox"
      value="${skill}"
      data-form-skill="${skill}"
      />${skill}</label
      >`;
    }
  }
  if (mode == "filter" || mode == "initial") {
    let filteredSkillOptions = filterSkills(skillOptions, input);
    for (let skill of filteredSkillOptions.sort()) {
      filterOptionsContainer.innerHTML += `<label class="filter-options flex"
        ><input
          id="filter-option"
          class="filter-checkbox"
          type="checkbox"
          value="${skill}"
          data-skill="${skill}"
        />${skill}</label
      >`;
    }
  }
  for (let skill of state.filterBy.skills) {
    if (filterOptionsContainer.querySelector(`[data-skill="${skill}"]`)) {
      filterOptionsContainer.querySelector(
        `[data-skill="${skill}"]`
      ).checked = true;
    }
  }
};
