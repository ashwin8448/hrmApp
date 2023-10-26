import {
  formOptionsContainer,
  newEmployeeForm,
} from "./elements.js";
import { state } from "./state.js";
import { filterArray } from "./filter.js";
import { employees } from "./firebase.js";
import { employeeSkillsArray } from "./state.js";

export const loadEmployeeData = (id, mode) => {
  state.filterBy.id.push(id);
  let employee = filterArray(employees)[0];
  if (mode == "edit") {
    newEmployeeForm["fname"].value = employee.fname;
    newEmployeeForm["lname"].value = employee.lname;
    newEmployeeForm["dob"].value = employee.dob;
    newEmployeeForm["address"].value = employee.address;
    newEmployeeForm["phone"].value = employee.phone;
    newEmployeeForm["email"].value = employee.email;
    newEmployeeForm["doj"].value = employee.doj;
    newEmployeeForm["department"].value = employee.department;
    newEmployeeForm["role"].value = employee.role;
    employeeSkillsArray.splice(0, employeeSkillsArray.length);
    if (employee.skills) {
      for (let skill of employee.skills) {
        formOptionsContainer
          .querySelector(`[data-form-skill="${skill}"]`)
          .click();
      }
    }
  } else {
    document.querySelector(".name").innerHTML =
      employee.fname + " " + employee.lname;
    document.querySelector(".dob").innerHTML = employee.dob;
    document.querySelector(".address").innerHTML = employee.address;
    document.querySelector(".phone").innerHTML = employee.phone;
    document.querySelector(".email").innerHTML = employee.email;
    document.querySelector(".doj").innerHTML = employee.doj;
    document.querySelector(".department").innerHTML = employee.department;
    document.querySelector(".role").innerHTML = employee.role;
    document.querySelector(".skills").innerHTML = employee.skills
      ? employee.skills.toString().replaceAll(",", ", ")
      : "";
  }
  state.filterBy.id.splice(0, 1);
};
