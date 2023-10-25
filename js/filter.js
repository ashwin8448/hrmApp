import { state } from "./state.js";

//Function to filter employee details
export const filterArray = (wholeArray) => {
  let result;
  let filteredArray = wholeArray.filter((employee) => {
    result = 1;
    for (let criteria in state.filterBy) {
      if (criteria == "search") {
        result *= state.filterBy[criteria].every((criteriaElement) => {
          return `${employee.fname.toLowerCase()} ${employee.lname.toLowerCase()}`.includes(
            criteriaElement.toLowerCase()
          );
        });
      } else {
        result *= state.filterBy[criteria].every((criteriaElement) => {
          return employee[criteria].includes(criteriaElement);
        });
      }
      if (!result) {
        return result;
      }
    }
    return result;
  });
  return filteredArray;
};

export const filterSkills = (allSkills, input) => {
  let filteredSkillOptions = allSkills.filter((skill) => {
    return skill.toLowerCase().includes(input.toLowerCase());
  });
  return filteredSkillOptions;
};
