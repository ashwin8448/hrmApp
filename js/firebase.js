export let employees = JSON.parse(localStorage.getItem("employees"));

// export let employees = employeesDb.employeeDetails;

export const setEmployees = (newEmployeesList)=>{
    employees = newEmployeesList
}
