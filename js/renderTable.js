import { tableBody } from "./elements.js";
import { filteredEmployees } from "./filter.js";
//Function to render table details
export const renderTable = () => {
  let temp = "";
  if (filteredEmployees.length == 0) {
    temp =
      "<tr><td class='table-no-data' colspan='5'>No data available</td></tr>";
  } else {
    for (let employee of filteredEmployees) {
      temp += `<tr class="table-row"> 
                      <td>${employee.id}</td>
                      <td>${employee.name}</td>
                      <td>${employee.department}</td>
                      <td>${employee.role}</td>
                      <td>
                        <button class="action-button-container">
                          <img
                            class="action-button upcoming"
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
