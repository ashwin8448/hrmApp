//Storing few employee details to localStorage
let employeesDb = [
  {
    id: 1006,
    name: "Sam",
    department: "FEED",
    skills: ["CSS"],
    role: "Intern",
  },
  {
    id: 1001,
    name: "Rahul",
    department: "Finance",
    skills: ["HTML"],
    role: "Intern",
  },
  {
    id: 1002,
    name: "Roy",
    department: "HR",
    skills: ["Angular"],
    role: "Intern",
  },
  {
    id: 1004,
    name: "Raj",
    department: "Backend",
    skills: ["Node"],
    role: "Intern",
  },
  {
    id: 1003,
    name: "Pam",
    department: "FEED",
    skills: ["CSS"],
    role: "Intern",
  },
  {
    id: 1005,
    name: "Pam",
    department: "FEED",
    skills: [""],
    role: "Intern",
  },
];
localStorage.setItem("employees", JSON.stringify(employeesDb));

//Function to render the table containing employee details
function renderTable(tableBody, employees) {
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
}

//Function to sort table
function sortTable(sortColumn, employees, columnFlag) {
  let flag;
  let key = sortColumn.dataset.storageKey;
  if (!(key in columnFlag)) {
    columnFlag[key] = 1;
  }
  flag = columnFlag[key];
  //Sorting numbers
  if (key === "id") {
    employees.sort((a, b) => {
      return (a[key] - b[key]) * flag;
    });
  }

  //Sorting Strings
  else {
    employees.sort((a, b) => {
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return 1 * flag;
      } else if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return -1 * flag;
      }
      return 0;
    });
  }

  //Setting flag for next sort order (asc/desc).
  columnFlag[key] = columnFlag[key] * -1;
  let sortIcon = sortColumn.querySelector(".sort-icon");
  let sortIconOpen = document.querySelector(".sort-icon.open");
  if (sortIconOpen) {
    sortIconOpen.classList.remove("open");
  }
  sortIcon.classList.add("open");
  if (columnFlag[key] == 1) {
    sortIcon.style.transform = "rotateX(180deg)";
  } else {
    sortIcon.style.transform = "rotateX(0deg)";
  }
}

function displayNewEmployeeFrom(overlay, newEmployeeForm) {
  overlay.classList.add("open");
  newEmployeeForm.classList.add("open");
}

function filterTable(
  target,
  filteredEmployees,
  filterSkill,
  employees,
  selectedSkills
) {
  let found;
  filteredEmployees = [];
  if (target.classList.contains("filter-checkbox")) {
    if (!filterSkill.includes(target.value)) {
      selectedSkills.innerHTML += `<div class="selected-skill-button ${target.value} flex">
      <span>${target.value}</span>
      <button type="button" class="skill-close"><img data-skill="${target.value}" src="./assets/images/skill_close_icon.svg" alt=""></button>
      </div>`;
      filterSkill.push(target.value);
    } else {
      selectedSkills.removeChild(
        document.querySelector(`.selected-skill-button.${target.value}`)
      );
      filterSkill.splice(filterSkill.indexOf(target.value), 1);
    }
  }
  if (filterSkill.length == 0) {
    clearFilter(filteredEmployees, filterSkill, selectedSkills);
    return employees;
  } else {
    for (let employee of employees) {
      found = 1;
      for (let skill of filterSkill) {
        if (!employee.skills.includes(skill)) {
          found = 0;
          break;
        }
      }
      if (found == 1) {
        filteredEmployees.push(employee);
      }
    }
  }
  return filteredEmployees;
}

function clearFilter(
  filteredEmployees,
  filterSkill,
  selectedSkills,
  employees
) {
  let checkboxes = document.querySelectorAll(".filter-checkbox");
  selectedSkills.innerHTML = "";
  for (let checkbox of checkboxes) {
    checkbox.checked = false;
  }
  filterSkill.splice(0, filterSkill.length);
  filteredEmployees.splice(0, filteredEmployees.length);
  return employees;
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const addNewButton = document.querySelector(".add-new-user");
  const tableBody = document.querySelector(".table-body");
  const table = document.querySelector(".table");
  const newEmployeeForm = document.querySelector(".new-employee-form");
  const filter = document.querySelector(".filter");
  const selectedSkills = document.querySelector(".selected-skills");
  const filterOptionsContainer = document.querySelector(
    ".filter-options-container"
  );
  const deleteModal = document.querySelector(".delete-employee");

  let employees = JSON.parse(localStorage.getItem("employees"));
  let sortColumn = document.querySelector('[data-storage-key="id"]');
  let columnFlag = {};
  let dataToRender = employees;
  let filterSkill = [];
  let filteredEmployees = [];
  let idToDelete;

  sortTable(sortColumn, employees, columnFlag);
  renderTable(tableBody, employees);

  addNewButton.addEventListener("click", () => {
    displayNewEmployeeFrom(overlay, newEmployeeForm);
  });

  filter.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-search")) {
      filterOptionsContainer.classList.add("open");
      overlay.classList.add("open", "dropdown");
      overlay.addEventListener("click", function overlayCloseHandler() {
        filterOptionsContainer.classList.remove("open");
        overlay.classList.remove("open", "dropdown");
        overlay.removeEventListener("click", overlayCloseHandler);
      });
    } else if (e.target.classList.contains("clear-filter-icon")) {
      filterOptionsContainer.classList.remove("open");
      overlay.classList.remove("open", "dropdown");
      dataToRender = clearFilter(
        filteredEmployees,
        filterSkill,
        selectedSkills,
        employees
      );
      renderTable(tableBody, dataToRender);
    } else {
      dataToRender = filterTable(
        e.target,
        filteredEmployees,
        filterSkill,
        employees,
        selectedSkills
      );
      renderTable(tableBody, dataToRender);
    }
  });

  selectedSkills.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      let targetTag = document.getElementById(e.target.dataset.skill);
      targetTag.click();
    }
  });

  table.addEventListener("click", (e) => {
    if (e.target.closest(".column-header")) {
      sortColumn = e.target.closest(".column-header");
      sortTable(sortColumn, dataToRender, columnFlag);
      renderTable(tableBody, dataToRender);
    } else if (e.target.dataset.action == "delete") {
      deleteModal.classList.add("open");
      overlay.classList.add("open");
      idToDelete = parseInt(e.target.dataset.employeeId);
    }
  });

  deleteModal.addEventListener("click", (deleteEvent) => {
    if (
      deleteEvent.target.tagName === "BUTTON" ||
      deleteEvent.target.parentElement.tagName === "BUTTON"
    ) {
      if (deleteEvent.target.value === "yes") {
        employees = employees.filter((employee) => employee.id !== idToDelete);
        localStorage.setItem("employees", JSON.stringify(employees));
        renderTable(tableBody, employees);
      }
      deleteModal.classList.remove("open");
      overlay.classList.remove("open");
    }
  });
});
