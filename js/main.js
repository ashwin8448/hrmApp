import {
  table,
  addNewButton,
  deleteModal,
  filterOptionsContainer,
  filter,
  selectedSkills,
  newEmployeeFormContainer,
  newEmployeeForm,
  viewEmployee,
  nameSearch,
  paginationConatiner,
  pageCustomInput,
  paginationForm,
  filterForm,
  addSkills,
  formOptionsContainer,
  filterSearch,
  formHeading,
  deleteNameHolder,
  formSelectedSkills,
} from "./elements.js";
import { displayTable } from "./displayTable.js";
import {
  deleteHandler,
  sortHandler,
  filterHandler,
  addNewEmployeeHandler,
  validationHandler,
  addSkillHandler,
} from "./handlers.js";
import {
  idToDelete,
  setIdToDelete,
  state,
  pagination,
  changePageNumber,
  employeeSkillsArray,
} from "./state.js";
import { submitValidation, validationReset } from "./formValidation.js";
import { toastHandler } from "./toast.js";
import { loadEmployeeData } from "./edit.js";
import { employees, lastId, skillOptions } from "./firebase.js";
import { loadFilteredSkills } from "./util.js";
import { addOverlay, removeOverlay } from "./util.js";

document.addEventListener("DOMContentLoaded", () => {
  addNewButton.addEventListener("click", () => {
    loadFilteredSkills("", "form")
    employeeSkillsArray.splice(0, employeeSkillsArray.length);
    newEmployeeForm.dataset.mode = "new";
    newEmployeeFormContainer.querySelector(".new-form").style.display = "block";
    newEmployeeFormContainer.querySelector(".edit-form").style.display = "none";
    addOverlay();
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
        employeeId = idToDelete;
      } else {
        employeeId = lastId + 1;
      }
      addNewEmployeeHandler(employeeId, newEmployeeForm.dataset.mode);
      setIdToDelete(-1);
      removeOverlay();
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
    formOptionsContainer.classList.remove("open");
    formHeading.innerHTML = "Add new user";
    formSelectedSkills.innerHTML="";
    employeeSkillsArray.splice(0, employeeSkillsArray.length);
    validationReset();
  });

  table.addEventListener("click", (e) => {
    if (e.target.closest(".column-header")) {
      sortHandler(e);
    } else if (e.target.dataset.action) {
      addOverlay();
      switch (e.target.dataset.action) {
        case "view":
          loadEmployeeData(e.target.dataset.employeeId, "view");
          viewEmployee.style.display = "block";
          setTimeout(() => viewEmployee.classList.add("open"), 100);
          break;
        case "edit":
          loadFilteredSkills("", "form");
          loadEmployeeData(parseInt(e.target.dataset.employeeId), "edit");
          setIdToDelete(e.target.dataset.employeeId);
          newEmployeeForm.dataset.mode = "edit";
          formHeading.innerHTML = "Edit user";
          newEmployeeFormContainer.style.display = "block";
          newEmployeeFormContainer.querySelector(".new-form").style.display =
            "none";
          newEmployeeFormContainer.querySelector(".edit-form").style.display =
            "block";
          setTimeout(() => newEmployeeFormContainer.classList.add("open"), 100);
          break;
        case "delete":
          setIdToDelete(parseInt(e.target.dataset.employeeId));
          let employeeToBeDeleted = employees.filter((employee) => {
            return employee.id == idToDelete;
          });
          deleteNameHolder.innerHTML =
            employeeToBeDeleted[0].fname + " " + employeeToBeDeleted[0].lname;
          deleteModal.style.display = "block";
          setTimeout(() => {
            deleteModal.classList.add("open");
          }, 100);
          break;
      }
    }
  });

  filter.addEventListener("click", filterHandler);
  addSkills.addEventListener("click", () => {
    formOptionsContainer.classList.add("open");
  });
  formOptionsContainer.addEventListener("click", addSkillHandler);

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  document.body.addEventListener("click", (e) => {
    if (!e.target.closest(".filter")) {
      filterOptionsContainer.classList.remove("open");
    }
    if (!e.target.closest(".form-skills")) {
      formOptionsContainer.classList.remove("open");
    }
    if (e.target.classList.contains("close-button")) {
      removeOverlay();
      e.target.closest(".modal").classList.remove("open");
      setTimeout(() => (newEmployeeFormContainer.style.display = "none"), 500);
      if (
        e.target
          .closest(".modal")
          .classList.contains("new-employee-form-container")
      )
        newEmployeeForm.reset();
    }
  });

  selectedSkills.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      let targetTag = filterOptionsContainer.querySelector(
        `[data-skill="${e.target.dataset.skill}"]`
      );
      if(targetTag) targetTag.click();
    }
  });

  formSelectedSkills.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      let targetTag = formOptionsContainer.querySelector(
        `[data-form-skill="${e.target.dataset.formSkill}"]`
      );
      targetTag.click();
    }
  });

  deleteModal.addEventListener("click", deleteHandler);

  filterSearch.addEventListener("keyup", (e) => {
    loadFilteredSkills(e.target.value, "filter");
  });

  addSkills.addEventListener("keyup", (e) => {
    loadFilteredSkills(e.target.value, "form");
  });

  nameSearch.addEventListener("keyup", (e) => {
    state.filterBy.search[0] = e.target.value;
    displayTable(employees);
  });

  nameSearch.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  paginationConatiner.addEventListener("click", (e) => {
    if (e.target.closest(".page-controls")) {
      switch (e.target.closest(".page-controls").dataset.goTo) {
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
      displayTable(employees);
    }
  });

  pageCustomInput.addEventListener("change", (e) => {
    changePageNumber(e.target);
    displayTable(employees);
  });

  paginationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    changePageNumber(e.target["page-number"]);
    displayTable(employees);
  });
});
