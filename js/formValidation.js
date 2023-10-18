import { newEmployeeForm, paginationForm, totalPages } from "./elements.js";
import { pagination } from "./state.js";

export const blankValidation = (input) => {
  if (input == "") throw "This field cannot be left blank.";
  return true;
};

export const nameValidation = (input) => {
  if (!/^[A-Za-z\s]+$/.test(input)) throw "Name can contain only alphabets.";
  return true;
};

export const emailValidation = (input) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) throw "Invalid email entered.";
  return true;
};

export const phoneValidation = (input) => {
  if (!/^[0-9]{10}$/.test(input)) throw "Invalid mobile number enetered.";
  return true;
};

export const submitValidation = () => {
  newEmployeeForm
    .querySelectorAll("input[data-type], select")
    .forEach((tag) => {
      tag.focus();
      tag.blur();
    });

  let anyErrorInput = document.querySelector(".error-placeholder.open");
  if (anyErrorInput) {
    anyErrorInput.previousElementSibling.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    anyErrorInput.previousElementSibling.focus();
    return false;
  }
  return true;
};

export const validationReset = () => {
  newEmployeeForm.querySelectorAll(".error-placeholder").forEach((tag) => {
    tag.classList.remove("open");
  });
};

export const paginationValidation = () => {
  paginationForm;
};
