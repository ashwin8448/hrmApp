import { loaderContainer, overlay } from "./elements.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getDatabase,
  set,
  onValue,
  update,
  remove,
  ref,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { displayTable } from "./displayTable.js";
import { addOverlay, loadDepartments, loadRoles, loadSkills } from "./util.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9RzV91uOswyTxNuiSvfTGullbi-EK2To",
  authDomain: "hrmapp-3d236.firebaseapp.com",
  databaseURL:
    "https://hrmapp-3d236-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hrmapp-3d236",
  storageBucket: "hrmapp-3d236.appspot.com",
  messagingSenderId: "989440032067",
  appId: "1:989440032067:web:98bd026c4bbf48dd2a03f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// export let individualdata;
export let employees = [];
export let roles = [];
export let departments = [];
export let skillOptions = [];
export let employeeData = {};
export let lastId;

export const setEmployees = (employeesList) => {
  employees = employeesList;
  displayTable(employees);
};

export const setRoles = (rolesList) => {
  roles = rolesList;
  loadRoles();
};

export const setDepartments = (departmentsList) => {
  departments = departmentsList;
  loadDepartments();
};

export const setSkills = (skillsList) => {
  skillOptions = skillsList;
  loadSkills("form");
  loadSkills("filter");
};

export const setLastId = (data) => {
  lastId = data;
};

const getEmployees = (callback) => {
  loaderContainer.classList.add("open");
  addOverlay();
  let userRef = ref(db, "employeeDetails/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      let userArr = [];
      const data = snapshot.val();
      for (const key in data) {
        const obj = {
          id: key,
          ...data[key],
        };
        userArr.push(obj);
      }
      callback(userArr);
    } else {
      callback([]);
    }
  });
};

const getDepartments = (callback) => {
  let userRef = ref(db, "department/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      let userArr = [];
      const data = snapshot.val();
      for (const key in data) {
        userArr.push(data[key]);
      }
      callback(userArr);
    } else {
      callback([]);
    }
  });
};

const getRoles = (callback) => {
  let userRef = ref(db, "roles/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      let userArr = [];
      const data = snapshot.val();
      for (const key in data) {
        userArr.push(data[key]);
      }
      callback(userArr);
    } else {
      callback([]);
    }
  });
};

const getSkills = (callback) => {
  let userRef = ref(db, "skills/");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      let userArr = [];
      const data = snapshot.val();
      for (const key in data) {
        userArr.push(data[key]);
      }
      callback(userArr);
    } else {
      callback([]);
    }
  });
};

const getLastId = (callback) => {
  let userRef = ref(db, "lastId");
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback(data);
    } else {
      callback([]);
    }
  });
};

getEmployees(setEmployees);
getRoles(setRoles);
getDepartments(setDepartments);
getSkills(setSkills);
getLastId(setLastId);

export const createEmployee = (data, employeeId) => {
  set(ref(db, "employeeDetails/" + employeeId), data);
};

export const updateEmployee = (data, employeeId) => {
  update(ref(db, "employeeDetails/" + employeeId), data);
};

export const updateLastId = (data) => {
  update(ref(db, "/"), data);
};

export const deleteEmployee = (employeeId) => {
  remove(ref(db, "employeeDetails/" + employeeId), null);
};

// export const getIndividualEmployee = (employeeId) => {
//   let indvRef = ref(db, "employee/" + employeeId);
//   onValue(indvRef, (snapshot) => {
//     employeeData = snapshot.val();
//   });
// };
