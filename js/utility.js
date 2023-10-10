export { filterTable, sortTable, renderTable };

//Function to filter employee details
const filterTable = (employees, filterObj) => {
  let result;
  employees = employees.filter((employee) => {
    result = 1;
    for (let criteria in filterObj) {
      result *= filterObj[criteria].every((criteriaElement) => {
        return employee[criteria].includes(criteriaElement);
      });
      if (!result) {
        return result;
      }
    }
    return result;
  });
  return employees;
};

//Function to sort details
const sortTable = (employees, criteria = "id", flag = 1) => {
  //Sorting numbers)
  if (criteria === "id") {
    employees.sort((a, b) => {
      return (a[criteria] - b[criteria]) * flag;
    });
  }

  //Sorting Strings
  else {
    employees.sort((a, b) => {
      if (a[criteria].toLowerCase() > b[criteria].toLowerCase()) {
        return 1 * flag;
      } else if (a[criteria].toLowerCase() < b[criteria].toLowerCase()) {
        return -1 * flag;
      }
      return 0;
    });
  }
};

//Function to render table details
const renderTable = (tableBody, employees) => {
  let temp = "";
  if (employees.length == 0) {
    temp =
      "<tr><td class='table-no-data' colspan='5'>No data available</td></tr>";
  } else {
    for (let employee of employees) {
      temp += `<tr class="table-row"> 
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.role}</td>
                    <td>
                      <button class="action-button-container">
                        <img
                          class="action-button"
                          src="./assets/images/edit_icon.svg"
                          alt=""
                          data-action="edit"
                          data-employee-id="${employee.id}"
                        />
                      </button>
                      <button class="action-button-container">
                        <img
                          class="action-button"
                          src="./assets/images/delete_icon.svg"
                          alt=""
                          data-action="delete"
                          data-employee-id="${employee.id}"
                        />
                      </button>
                    </td>
                  </tr>`;
    }
  }
  tableBody.innerHTML = temp;
};
