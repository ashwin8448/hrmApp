import {
  table,
  addNewButton,
  deleteModal,
  overlay,
  filterOptionsContainer,
  filter,
  selectedSkills, newEmployeeForm
} from "./elements.js";
import { displayTable } from "./displayTable.js";
import { deleteHandler, sortHandler, filterHandler } from "./handlers.js";
import { setIdToDelete } from "./state.js";
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

document.addEventListener("DOMContentLoaded", () => {
  //Display table on load, sorted by id.
  displayTable();

  addNewButton.addEventListener("click", () => {
    overlay.classList.add("open");
    newEmployeeForm.style.display = "block";
    setTimeout(() => newEmployeeForm.classList.add("open"),200)
  });

  table.addEventListener("click", (e) => {
    if (e.target.closest(".column-header")) {
      sortHandler(e);
    } else if (e.target.dataset.action == "delete") {
      deleteModal.classList.add("open");
      overlay.classList.add("open");
      setIdToDelete(parseInt(e.target.dataset.employeeId));
    }
  });

  filter.addEventListener("click", filterHandler);

  document.body.addEventListener("click", (e) => {
    if (!e.target.closest(".filter")) {
      filterOptionsContainer.classList.remove("open");
    }
  });

  selectedSkills.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      let targetTag = document.getElementById(e.target.dataset.skill);
      targetTag.click();
    }
  });

  deleteModal.addEventListener("click", deleteHandler);
});
