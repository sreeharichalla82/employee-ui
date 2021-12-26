import React, { Component } from 'react'
import { FaSave, FaTimes } from 'react-icons/fa';
import employeeService from '../services/employee-service';

export class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.match.params.action,
            empId: this.props.match.params.empId,
            name: '',
            department: 'IT',
            salary: 0
        }
        console.error(this.state.empId +"  "+this.state.action)
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
    }


    componentDidMount() {
        if (this.state.action == 'add') {
            return;
        }
        else {
            employeeService.getEmployeeById(this.state.empId).then(res => {
                let empObj = res.data;
                this.setState({
                    name: empObj.name,
                    department: empObj.department,
                    salary: empObj.salary
                })

            })
        }
    }

    changeNameHandler = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    changeDepartmentHandler = (event) => {
        this.setState({
            department: event.target.value
        })
    }

    changeSalaryHandler = (event) => {
        this.setState({
            salary: event.target.value
        })
    }

    cancel = (event) => {
        this.props.history.push("/employees");
    }

    saveOrUpdateEmployee = (event) => {
        event.preventDefault();
        let employee = {
            name: this.state.name,
            department: this.state.department,
            salary: this.state.salary
        }
        if (this.state.action == 'add') {
            employeeService.createEmployee(employee).then(res => {
                this.props.history.push("/employees");
            })
        }
        else {
            employeeService.updateEmployee(this.state.empId, employee).then(res => {
                this.props.history.push("/employees");
            })
        }
    }


    render() {
        let title = this.state.action == 'add' ? <h4>Add Employee</h4> : <h4>Update Employee</h4>
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <div className='card-header'>
                                {title}
                            </div>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group mt-1' >
                                        <label className='float-left bold'>Name:</label>
                                        <input type="text" name="name" className='form-control' value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className='form-group mt-1'>
                                        <label className='float-left bold'>Department:</label>
                                        <select class="form-control" value={this.state.department} onChange={this.changeDepartmentHandler} >
                                            <option value="IT">IT</option>
                                            <option value="HR">HR</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>

                                    </div>
                                    <div className='form-group mt-1'>
                                        <label className='float-left bold'>Salary:</label>
                                        <input type="text" name="salary" className='form-control' value={this.state.salary} onChange={this.changeSalaryHandler} />
                                    </div>
                                </form>
                            </div>
                            <div className='card-footer'>
                                <button className='btn btn-success' onClick={this.saveOrUpdateEmployee}><FaSave></FaSave> Save</button>
                                <button className='btn btn-warning ml-1' onClick={this.cancel.bind(this)}><FaTimes></FaTimes>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default AddEmployee
