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
    let count = 0;
    viewEmployee.children[2].firstElementChild.innerHTML = "";
    for (let detail in filteredEmployees[0]) {
      if (count > 2) {
        viewEmployee.children[count].firstElementChild.innerHTML =
          filteredEmployees[0][detail];
      } else if (count >= 1) {
        viewEmployee.children[2].firstElementChild.innerHTML +=
          filteredEmployees[0][detail] + " ";
      }
      count++;
    }
  }
  state.filterBy.id.splice(0, 1);
};
