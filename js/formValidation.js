import { newEmployee } from "./elements.js";

export const blankValidation = (input) => {
  if (input == "") throw "This field cannot be left blank.";
  return true;
};

export const nameValidation = (input) => {
  if (!/^[A-Za-z\s]+$/.test(input)) throw "Invalid name.";
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

export const submitValidation=(input)=>{

}
