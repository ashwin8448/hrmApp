import {
  newEmployeeForm,
  formOptionsContainer,
  filterOptionsContainer,
  overlay,
} from "./elements.js";
import { filterSkills } from "./filter.js";
import { departments, roles, skillOptions } from "./firebase.js";
import { employeeSkillsArray, state } from "./state.js";

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

export const loadSkills = (mode) => {
  let toLoad;
  if (mode == "form") {
    toLoad = formOptionsContainer;
  } else {
    toLoad = filterOptionsContainer;
  }
  toLoad.innerHTML = ``;
  skillOptions.sort();
  for (let skill of skillOptions.sort()) {
    toLoad.innerHTML += `<label class="${
      mode == "form" ? "form" : "filter"
    }-options flex" data-label-skill="${skill}"
      ><input
      id="${mode == "form" ? "form" : "filter"}-option-${skill}"
      class="${mode == "form" ? "form" : "filter"}-checkbox"
      type="checkbox"
      value="${skill}"
      data-${mode == "form" ? "form-" : ""}skill="${skill}"
      />${skill}</label
      >`;
  }
};

export const loadFilteredSkills = (input = "", mode) => {
  let toLoad, filteredSkillsToLoad;
  if (mode == "form") {
    toLoad = formOptionsContainer;
  } else {
    toLoad = filterOptionsContainer;
  }
  filteredSkillsToLoad = filterSkills(skillOptions, input);
  skillOptions.sort();
  for (let label of toLoad.querySelectorAll("label")) {
    if (filteredSkillsToLoad.includes(label.dataset.labelSkill)) {
      label.style.display = "flex";
    } else {
      label.style.display = "none";
    }
  }
};

export const addOverlay = () => {
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

export const removeOverlay = () => {
  overlay.classList.remove("open");
  document.body.style.overflow = "auto";
};
