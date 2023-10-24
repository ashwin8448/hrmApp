import { formOptionsContainer, newEmployeeForm, viewEmployee } from "./elements.js";
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
    for(let skill of filteredEmployees[0].skills){
      formOptionsContainer.querySelector(`#form-${skill}`).checked=true;
    }

  } else {
    viewEmployee.children[2].firstElementChild.innerHTML =
      filteredEmployees[0].fname + " " + filteredEmployees[0].lname;
    viewEmployee.children[3].firstElementChild.innerHTML =
      filteredEmployees[0].dob;
    viewEmployee.children[4].firstElementChild.innerHTML =
      filteredEmployees[0].address;
    viewEmployee.children[5].firstElementChild.innerHTML =
      filteredEmployees[0].phone;
    viewEmployee.children[6].firstElementChild.innerHTML =
      filteredEmployees[0].email;
    viewEmployee.children[7].firstElementChild.innerHTML =
      filteredEmployees[0].doj;
    viewEmployee.children[8].firstElementChild.innerHTML =
      filteredEmployees[0].department;
    viewEmployee.children[9].firstElementChild.innerHTML =
      filteredEmployees[0].role;
    viewEmployee.children[10].firstElementChild.innerHTML =
      filteredEmployees[0].skills;
  }
  state.filterBy.id.splice(0, 1);
};
