import axios from "axios";

class EmployeeService {
   getAllEmployess(){
       return axios.get("/api/employees/")
   }

   getEmployeeById(employeeId){
    return axios.get("/api/employees/"+employeeId)
   }

   createEmployee(employee){
       return axios.post("/api/employees",employee);
   }

   updateEmployee(employeeId,employee){
       return axios.put("/api/employees/"+employeeId,employee);
   }
   
   deleteEmployee(employeeId){
       return axios.delete("/api/employees/"+employeeId)
   }
}
export default new EmployeeService();