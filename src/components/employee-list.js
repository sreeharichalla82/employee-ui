import React, { Component } from 'react'
import { FaCross, FaHeart, FaPencilAlt, FaPlus, FaRecycle, FaRemoveFormat, FaTimes } from "react-icons/fa";
import EmployeeService from '../services/employee-service';

export default class EmployeeList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            employeList: []
        }
       
    }


    componentDidMount() {
        EmployeeService.getAllEmployess().then(res => {
            this.setState({ employeList: res.data });
        })
    }

    addEmployee(){
       this.props.history.push("/alteremployee/add/0");
    }

    editEmployee(empId){
        this.props.history.push("/alteremployee/edit/"+empId);
    }

    deleteEmployee(empId){
        EmployeeService.deleteEmployee(empId).then(res => {
            EmployeeService.getAllEmployess().then(res => {
                this.setState({ employeList: res.data });
            })
        })
    }

    render() {
        return (
            <div>
                <div className='row mt-1'>
                    <div className='col-md-6'>
                       
                    </div>
                    <div className='col-md-6'>
                        <button className='btn btn-primary' style={{float:'right'}} onClick={this.addEmployee.bind(this)}><FaPlus></FaPlus> <span className='ml-1'>Add Employee</span></button>
                    </div>
                </div>
                <div className='row mt-1'>
                    <div className='col-md-12'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Employee Id</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employeList.map(emp => {
                                        return (<tr key={emp.empId}>
                                            <td>{emp.empId}</td>
                                            <td>{emp.name}</td>
                                            <td>{emp.department}</td>
                                            <td>${emp.salary}</td>
                                            <td>                                                
                                                <button class="btn btn-sm btn-info ml-1" onClick={() => this.editEmployee(emp.empId)}><FaPencilAlt></FaPencilAlt></button>
                                                <button class="btn btn-sm btn-danger ml-1" onClick={()=> this.deleteEmployee(emp.empId)}><FaTimes></FaTimes></button>
                                            </td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
