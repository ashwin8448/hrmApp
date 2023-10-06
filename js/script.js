//Storing few employee details to localStorage
let employees = [
  {
    id: 1000,
    name: "Ram",
    department: "BDG",
    skills: ["React", "CSS"],
    role: "Intern",
  },
  {
    id: 1001,
    name: "Sam",
    department: "FEED",
    skills: ["CSS"],
    role: "Intern",
  },
  {
    id: 1002,
    name: "Rahul",
    department: "Finance",
    skills: ["HTML"],
    role: "Intern",
  },
  {
    id: 1003,
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
    id: 1005,
    name: "Pam",
    department: "FEED",
    skills: ["CSS"],
    role: "Intern",
  },
  {
    id: 1006,
    name: "Pam",
    department: "FEED",
    skills: [""],
    role: "Intern",
  },
];
localStorage.setItem("employees", JSON.stringify(employees));

//Function to render the table containing employee details
function renderTable(tableBody, employees) {
  let temp = "";
  for (let employee of employees) {
    temp += `<tr class="table-row"> 
                  <td>${employee.id}</td>
                  <td>${employee.name}</td>
                  <td>${employee.department}</td>
                  <td>${employee.role}</td>
                  <td>
                    <button>
                      <img
                        class="action-button"
                        src="./assets/images/edit_icon.svg"
                        alt=""
                      />
                    </button>
                    <button>
                      <img
                        class="action-button"
                        src="./assets/images/delete_icon.svg"
                        alt=""
                      />
                    </button>
                  </td>
                </tr>`;
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
  e,
  filteredEmployees,
  filterSkill,
  employees,
  selectedSkills
) {
  let found;
  filteredEmployees = [];
  console.log(e.target);
  if (e.target.classList.contains("filter-checkbox")) {
    if (!filterSkill.includes(e.target.value)) {
      selectedSkills.innerHTML += `<div class="selected-skill-button ${e.target.value} flex">
      <span>${e.target.value}</span>
      <button class="skill-close"><img data-skill="${e.target.value}" src="./assets/images/skill_close_icon.svg" alt=""></button>
      </div>`;
      filterSkill.push(e.target.value);
    } else {
      selectedSkills.removeChild(
        document.querySelector(`.selected-skill-button.${e.target.value}`)
      );
      filterSkill.splice(filterSkill.indexOf(e.target.value), 1);
    }
  }
  if (filterSkill.length == 0) {
    return clearFilter(filteredEmployees, filterSkill, selectedSkills);
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

function clearFilter(filteredEmployees, filterSkill, selectedSkills) {
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
  const button = document.querySelector(".add-new-user");
  const tableBody = document.querySelector(".table-body");
  const table = document.querySelector(".table");
  const newEmployeeForm = document.querySelector(
    ".new-employee-form-container"
  );
  button.addEventListener("click", () => {
    displayNewEmployeeFrom(overlay, newEmployeeForm);
  });
  let employees = JSON.parse(localStorage.getItem("employees"));
  let sortColumn = document.querySelector('[data-storage-key="id"]');
  let columnFlag = {};
  sortTable(sortColumn, employees, columnFlag);
  renderTable(tableBody, employees);

  const clearFilterButton = document.querySelector(".clear-filter-button");
  const filter = document.querySelector(".filter");
  const selectedSkills = document.querySelector(".selected-skills");
  const filterSearch = document.querySelector(".filter-search");
  const filterOptionsContainer = document.querySelector(
    ".filter-options-container"
  );
  filterSearch.addEventListener("click", () => {
    filterOptionsContainer.classList.add("open");
  });
  let dataToRender = employees;
  let filterSkill = [];
  let filteredEmployees = [];
  filter.addEventListener("click", (e) => {
    dataToRender = filterTable(
      e,
      filteredEmployees,
      filterSkill,
      employees,
      selectedSkills
    );
    renderTable(tableBody, dataToRender);
  });
  clearFilterButton.addEventListener("click", () => {
    dataToRender = clearFilter(filteredEmployees, filterSkill, selectedSkills);
    renderTable(tableBody, dataToRender);
  });

  table.addEventListener("click", (e) => {
    sortColumn = e.target.closest(".column-header");
    if (sortColumn) {
      sortTable(sortColumn, employees, columnFlag);
      renderTable(tableBody, employees);
    }
  });
});
