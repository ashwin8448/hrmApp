import { paginationConatiner, tableBody, pageCustomInput } from "./elements.js";
import { pagination } from "./state.js";
//Function to render table details
export const renderTable = (processedEmployees) => {
  paginationConatiner.style.visibility = "visible";
  let temp = "";
  if (pagination.totalPages == 1) {
    paginationConatiner.style.visibility = "hidden";
  }
  if (!processedEmployees.length) {
    paginationConatiner.style.visibility = "hidden";
    temp =
      "<tr><td class='table-no-data' colspan='5'>No data available</td></tr>";
  } else {
    let value = Number(pageCustomInput.value);
    for (
      let i = pagination.rowsPerPage * (value - 1);
      i < pagination.rowsPerPage * value && i < processedEmployees.length;
      i++
    ) {
      temp += `<tr class="table-row"> 
                      <td class="employee-id">${processedEmployees[i].id}</td>
                      <td>${processedEmployees[i].fname} ${processedEmployees[i].lname}</td>
                      <td>${processedEmployees[i].department}</td>
                      <td>${processedEmployees[i].role}</td>
                      <td>
                      <button class="action-button-container">
                      <img
                        class="action-button"
                        src="./assets/images/view_user_icon.svg"
                        alt="view details icon"
                        data-action="view"
                        data-employee-id="${processedEmployees[i].id}"
                      />
                    </button>
                        <button class="action-button-container">
                          <img
                            class="action-button"
                            src="./assets/images/edit_icon.svg"
                            alt="edit details icon"
                            data-action="edit"
                            data-employee-id="${processedEmployees[i].id}"
                          />
                        </button>
                        <button class="action-button-container">
                          <img
                            class="action-button"
                            src="./assets/images/delete_icon.svg"
                            alt="delete employee icon"
                            data-action="delete"
                            data-employee-id="${processedEmployees[i].id}"
                          />
                        </button>
                      </td>
                    </tr>`;
    }
  }
  tableBody.innerHTML = temp;
};
