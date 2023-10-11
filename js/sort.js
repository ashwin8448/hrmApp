import { state } from "./state.js";
import { filteredEmployees } from "./filter.js";

//Function to sort details
export const sortEmployees = () => {
  //Sorting numbers)
  if (state.sortBy === "id") {
    filteredEmployees.sort((a, b) => {
      return (a[state.sortBy] - b[state.sortBy]) * state.sortFlag;
    });
  }
  //Sorting Strings
  else {
    filteredEmployees.sort((a, b) => {
      if (a[state.sortBy].toLowerCase() > b[state.sortBy].toLowerCase()) {
        return 1 * state.sortFlag;
      } else if (
        a[state.sortBy].toLowerCase() < b[state.sortBy].toLowerCase()
      ) {
        return -1 * state.sortFlag;
      }
      return 0;
    });
  }
};
