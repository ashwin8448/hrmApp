import { formOptionsContainer, newEmployeeForm, viewEmployee } from "./elements.js";
import { state } from "./state.js";
import { filterArray } from "./filter.js";
import { employees } from "./firebase.js";

export const loadEmployeeData = (id, mode) => {
  state.filterBy.id.push(id);
  let employee=filterArray(employees)[0];
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
    for(let skill of employee.skills){
      formOptionsContainer.querySelector(`[data-form-skill="${skill}"]`).checked=true;
    }
  } else {
    viewEmployee.children[2].firstElementChild.innerHTML =
      employee.fname + " " + employee.lname;
    viewEmployee.children[3].firstElementChild.innerHTML =
      employee.dob;
    viewEmployee.children[4].firstElementChild.innerHTML =
      employee.address;
    viewEmployee.children[5].firstElementChild.innerHTML =
      employee.phone;
    viewEmployee.children[6].firstElementChild.innerHTML =
      employee.email;
    viewEmployee.children[7].firstElementChild.innerHTML =
      employee.doj;
    viewEmployee.children[8].firstElementChild.innerHTML =
      employee.department;
    viewEmployee.children[9].firstElementChild.innerHTML =
      employee.role;
    viewEmployee.children[10].firstElementChild.innerHTML =
      employee.skills;
  }
  state.filterBy.id.splice(0, 1);
};
