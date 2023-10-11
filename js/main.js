import { table, addNewButton } from "./elements.js";
import { displayTable } from "./displayTable.js";
import { setState } from "./state.js";

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
    department: "BDG",
    skills: ["CSS", "HTML"],
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

const sortHandler = (e) => {
  let sortColumn = e.target.closest(".column-header").dataset.storageKey;

  setState("sortBy", sortColumn);
  displayTable();
};

// const sortHandler = (sortColumn, employees, sortData) => {
//   let key = sortColumn.dataset.storageKey;
//   let sortIcon = sortColumn.querySelector(".sort-icon");
//   let sortIconOpen = document.querySelector(".sort-icon.open");

//   if (sortIconOpen) {
//     sortIconOpen.style.transform = `rotateX(0deg)`;
//     sortIconOpen.classList.remove("open");
//   }
//   sortIcon.classList.add("open");

//   sortData.flag = key == sortData.previousKey ? sortData.flag * -1 : 1;
//   sortData.flag == 1
//     ? (sortIcon.style.transform = `rotateX(0deg)`)
//     : (sortIcon.style.transform = `rotateX(180deg)`);

//   sortTable(employees, key, sortData.flag);
//   sortData.previousKey = key;
// };

const filterHandler = (target, filterObj, employees, selectedSkills) => {
  if (target.classList.contains("filter-checkbox")) {
    if (!filterObj.skills.includes(target.value)) {
      selectedSkills.innerHTML += `<div class="selected-skill-button ${target.value} flex">
        <span>${target.value}</span>
        <button type="button" class="skill-close"><img data-skill="${target.value}" src="./assets/images/skill_close_icon.svg" alt=""></button>
        </div>`;
      filterObj.skills.push(target.value);
    } else {
      selectedSkills.removeChild(
        document.querySelector(`.selected-skill-button.${target.value}`)
      );
      filterObj.skills.splice(filterObj.skills.indexOf(target.value), 1);
    }
  }
  if (filterObj.skills.length == 0) {
    clearFilter(filterObj, selectedSkills);
  } else employees = filterTable(employees, filterObj);
  return employees;
};

function clearFilter(filterObj, selectedSkills) {
  let checkboxes = document.querySelectorAll(".filter-checkbox");
  selectedSkills.innerHTML = "";
  for (let checkbox of checkboxes) {
    checkbox.checked = false;
  }
  filterObj.skills.splice(0, filterObj.skills.length);
}

function displayNewEmployeeFrom(overlay, newEmployeeForm) {
  overlay.classList.add("open");
  newEmployeeForm.classList.add("open");
}

document.addEventListener("DOMContentLoaded", () => {
  displayTable();
  addNewButton.addEventListener("click", () => {
    displayNewEmployeeFrom(overlay, newEmployeeForm);
  });

  table.addEventListener("click", (e) => {
    if (e.target.closest(".column-header")) {
      sortHandler(e);
    } else if (e.target.dataset.action == "delete") {
      deleteModal.classList.add("open");
      overlay.classList.add("open");
      idToDelete = parseInt(e.target.dataset.employeeId);
    }
  });
});
// document.addEventListener("DOMContentLoaded", () => {
//   let employees = JSON.parse(localStorage.getItem("employees"));
//   let sortColumn = document.querySelector('[data-storage-key="id"]');
//   let dataToRender = employees;
//   let filterObj = { skills: [] };
//   let idToDelete;
//   let sortData = { previousKey: "", flag: 1 };
//   sortHandler(sortColumn, employees, sortData);
//   renderTable(tableBody, employees);

//   filter.addEventListener("click", (e) => {
//     if (e.target.classList.contains("filter-search")) {
//       filterOptionsContainer.classList.add("open");
//     } else if (e.target.classList.contains("clear-filter-icon")) {
//       filterOptionsContainer.classList.remove("open");
//       dataToRender = employees;
//       clearFilter(filterObj, selectedSkills);
//       renderTable(tableBody, dataToRender);
//     } else {
//       dataToRender = filterHandler(
//         e.target,
//         filterObj,
//         employees,
//         selectedSkills
//       );
//       renderTable(tableBody, dataToRender);
//     }
//   });

//   document.body.addEventListener("click", (e) => {
//     if (!e.target.closest(".filter")) {
//       filterOptionsContainer.classList.remove("open");
//     }
//   });

//   selectedSkills.addEventListener("click", (e) => {
//     if (e.target.tagName === "IMG") {
//       let targetTag = document.getElementById(e.target.dataset.skill);
//       targetTag.click();
//     }
//   });

//   deleteModal.addEventListener("click", (e) => {
//     if (
//       e.target.tagName === "BUTTON" ||
//       e.target.parentElement.tagName === "BUTTON"
//     ) {
//       if (e.target.value === "yes") {
//         employees = employees.filter((employee) => employee.id !== idToDelete);
//         localStorage.setItem("employees", JSON.stringify(employees));
//         dataToRender = filterHandlemployees,er(
//           e.target,
//           filterObj,
//           employees,
//           selectedSkills
//         );
//         renderTable(tableBody, dataToRender);
//       }
//       deleteModal.classList.remove("open");
//       overlay.classList.remove("open");
//     }
//   });
// });
