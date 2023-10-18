import {
  table,
  addNewButton,
  deleteModal,
  overlay,
  filterOptionsContainer,
  filter,
  selectedSkills,
  newEmployeeFormContainer,
  newEmployeeForm,
  viewEmployee,
  nameSearch,
  paginationConatiner,
  pageCustomInput,
} from "./elements.js";
import { displayTable } from "./displayTable.js";
import {
  deleteHandler,
  sortHandler,
  filterHandler,
  addNewEmployeeHandler,
  validationHandler,
} from "./handlers.js";
import {
  idToDelete,
  setIdToDelete,
  getId,
  state,
  setTotalPages,
  pagination,
} from "./state.js";
import { submitValidation, validationReset } from "./formValidation.js";
import { toastHandler } from "./toast.js";
import { loadEmployeeData } from "./edit.js";
import { employees, setEmployees } from "./firebase.js";
import { filteredEmployees } from "./filter.js";

let employeesDb = [
  {
    id: "1000",
    fname: "JacobA",
    lname: "RoyA",
    dob: "1111-01-01",
    address: "ABC1",
    phone: "0123456781",
    email: "a1@y.com",
    doj: "1111-01-02",
    department: "BDG",
    role: "Intern",
    skills: ["HTML", "CSS"],
  },
  {
    id: "1001",
    fname: "JacobB",
    lname: "RoyB",
    dob: "1111-01-03",
    address: "ABC2",
    phone: "0123456782",
    email: "a2@y.com",
    doj: "1111-01-04",
    department: "Accounts",
    role: "Intern",
    skills: ["CSS"],
  },
  {
    id: "1002",
    fname: "JacobC",
    lname: "RoyC",
    dob: "1111-01-05",
    address: "ABC3",
    phone: "0123456783",
    email: "a3@y.com",
    doj: "1111-01-06",
    department: "HR",
    role: "Intern",
    skills: ["HTML", "CSS", "React"],
  },
  {
    id: "1003",
    fname: "JacobD",
    lname: "RoyD",
    dob: "1111-01-07",
    address: "ABC4",
    phone: "0123456784",
    email: "a4@y.com",
    doj: "1111-01-08",
    department: "BDG",
    role: "Intern",
    skills: ["React", "Node"],
  },
];

localStorage.setItem("employees", JSON.stringify(employeesDb));

document.addEventListener("DOMContentLoaded", () => {
  //Display table on load, sorted by id.
  displayTable(0);
  addNewButton.addEventListener("click", () => {
    newEmployeeForm.dataset.mode = "new";
    newEmployeeFormContainer.querySelector(".new-form").style.display = "block";
    newEmployeeFormContainer.querySelector(".edit-form").style.display = "none";
    overlay.classList.add("open");
    newEmployeeFormContainer.style.display = "block";
    let currentDate = new Date();
    newEmployeeForm["dob"].max = `${currentDate.getFullYear() - 18}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    setTimeout(() => newEmployeeFormContainer.classList.add("open"), 100);
  });

  newEmployeeForm.addEventListener("blur", validationHandler, true);

  newEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let employeeId;
    if (submitValidation()) {
      if (newEmployeeForm.dataset.mode == "edit") {
        setEmployees(employees.filter((employee) => employee.id != idToDelete));
        employeeId = idToDelete;
      } else {
        employeeId = getId();
      }
      addNewEmployeeHandler(e, employeeId);
      setIdToDelete(-1);
      overlay.classList.remove("open");
      newEmployeeFormContainer.classList.remove("open");
      setTimeout(() => {
        newEmployeeFormContainer.style.display = "none";
        newEmployeeFormContainer.querySelector(".new-form").style.display =
          "none";
      }, 500);
      newEmployeeForm.reset();
      if (newEmployeeForm.dataset.mode == "edit")
        toastHandler("Employee details edited successfully.");
      else toastHandler("New employee added successfully.");
    }
  });

  newEmployeeForm.addEventListener("reset", (e) => {
    validationReset();
  });

  table.addEventListener("click", (e) => {
    if (e.target.closest(".column-header")) {
      sortHandler(e);
    } else if (e.target.dataset.action) {
      overlay.classList.add("open");
      switch (e.target.dataset.action) {
        case "view":
          loadEmployeeData(parseInt(e.target.dataset.employeeId), "view");
          viewEmployee.style.display = "block";
          setTimeout(() => viewEmployee.classList.add("open"), 100);
          break;
        case "edit":
          loadEmployeeData(parseInt(e.target.dataset.employeeId), "edit");
          setIdToDelete(e.target.dataset.employeeId);
          newEmployeeForm.dataset.mode = "edit";
          newEmployeeFormContainer.style.display = "block";
          newEmployeeFormContainer.querySelector(".new-form").style.display =
            "none";
          newEmployeeFormContainer.querySelector(".edit-form").style.display =
            "block";
          setTimeout(() => newEmployeeFormContainer.classList.add("open"), 100);
          break;
        case "delete":
          setIdToDelete(parseInt(e.target.dataset.employeeId));
          deleteModal.style.display = "block";
          setTimeout(() => deleteModal.classList.add("open"), 100);
          break;
      }
    }
  });

  filter.addEventListener("click", filterHandler);

  document.body.addEventListener("click", (e) => {
    if (!e.target.closest(".filter")) {
      filterOptionsContainer.classList.remove("open");
    }
    if (e.target.classList.contains("close-button")) {
      overlay.classList.remove("open");
      e.target.closest(".modal").classList.remove("open");
      setTimeout(() => (newEmployeeFormContainer.style.display = "none"), 500);
      if (
        e.target
          .closest(".modal")
          .classList.contains(".new-employee-form-container")
      )
        newEmployeeForm.reset();
    }
  });

  selectedSkills.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      let targetTag = document.getElementById(e.target.dataset.skill);
      targetTag.click();
    }
  });

  deleteModal.addEventListener("click", deleteHandler);

  nameSearch.addEventListener("keyup", (e) => {
    state.filterBy.search[0] = e.target.value;
    displayTable();
  });

  paginationConatiner.addEventListener("click", (e) => {
    if (e.target.dataset.goTo) {
      switch (e.target.dataset.goTo) {
        case "start":
          pageCustomInput.value = 1;
          break;
        case "previous":
          pageCustomInput.value =
            Number(pageCustomInput.value) - 1 <= 0
              ? 1
              : Number(pageCustomInput.value) - 1;
          break;
        case "next":
          pageCustomInput.value =
            Number(pageCustomInput.value) + 1 > pagination.totalPages
              ? pagination.totalPages
              : Number(pageCustomInput.value) + 1;
          break;
        case "end":
          pageCustomInput.value = pagination.totalPages;
          break;
      }
      displayTable();
    }
  });
//working here
  pageCustomInput.addEventListener("click", (e) => {
    displayTable();
  });

  document.forms["pagination"].addEventListener("submit", (e) => {
    e.preventDefault();
    displayTable();
  });
});
