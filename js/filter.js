import { employees } from "./firebase.js";
import { state } from "./state.js";

export let filteredEmployees = [];

//Function to filter employee details
export const filterEmployees = () => {
  filteredEmployees = employees;
  let result;
  filteredEmployees = filteredEmployees.filter((employee) => {
    result = 1;
    for (let criteria in state.filterBy) {
      result *= state.filterBy[criteria].every((criteriaElement) => {
        return employee[criteria].includes(criteriaElement);
      });
      if (!result) {
        return result;
      }
    }
    return result;
  });
};
