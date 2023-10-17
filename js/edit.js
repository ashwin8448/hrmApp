import { newEmployeeForm, viewEmployee } from "./elements.js";
import { state } from "./state.js";
import { filterEmployees, filteredEmployees } from "./filter.js";

export const loadEmployeeData = (id, mode) => {
  state.filterBy.id.push(id);
  filterEmployees();
  if (mode == "edit") {
    newEmployeeForm["fname"].value = filteredEmployees[0].fname;
    newEmployeeForm["lname"].value = filteredEmployees[0].lname;
    newEmployeeForm["dob"].value = filteredEmployees[0].dob;
    newEmployeeForm["address"].value = filteredEmployees[0].address;
    newEmployeeForm["phone"].value = filteredEmployees[0].phone;
    newEmployeeForm["email"].value = filteredEmployees[0].email;
    newEmployeeForm["doj"].value = filteredEmployees[0].doj;
    newEmployeeForm["department"].value = filteredEmployees[0].department;
    newEmployeeForm["role"].value = filteredEmployees[0].role;
    newEmployeeForm["skills"].value = filteredEmployees[0].skills;
  } else {
    viewEmployee.children[2].children[0].innerHTML =
      filteredEmployees[0].fname + " " + filteredEmployees[0].lname;
    viewEmployee.children[3].children[0].innerHTML = filteredEmployees[0].dob;
    viewEmployee.children[4].children[0].innerHTML =
      filteredEmployees[0].address;
    viewEmployee.children[5].children[0].innerHTML = filteredEmployees[0].phone;
    viewEmployee.children[6].children[0].innerHTML = filteredEmployees[0].email;
    viewEmployee.children[7].children[0].innerHTML = filteredEmployees[0].doj;
    viewEmployee.children[8].children[0].innerHTML =
      filteredEmployees[0].department;
    viewEmployee.children[9].children[0].innerHTML = filteredEmployees[0].role;
    viewEmployee.children[10].children[0].innerHTML =
      filteredEmployees[0].skills;
  }
  state.filterBy.id.splice(0, 1);
};
