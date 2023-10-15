import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EmployeeTable from '../elements/employees/EmployeeTable.js'
import EmployeeModal from '../elements/employees/EmployeeModal.js'

export default class Employees extends Component {

    state = {
        employees: []
    }

    axiosCreate() {
        let axiosReq = axios.create({
            baseURL: this.props.url
        });
        return axiosReq
    }

    generateEmployeeData() {
        this.axiosCreate().get('employee').then(res => {
            this.setState({ employees: res.data.data })
        })
    }

    componentDidMount() {
        document.title = 'Employees'
        this.generateEmployeeData()
    }

    render() {
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h4 className="m-2 font-weight-bold text-primary">EMPLOYEES&nbsp;<a href="#" data-toggle="modal" data-target="#aModal" type="button" className="btn btn-primary bg-gradient-primary" style={{ borderRadius: "0px" }}><i className="fas fa-fw fa-plus"></i></a></h4>
                </div>
                <div className="card-body">
                    <EmployeeTable tools={this.props.tools} data_set={this.state.employees} req={this.axiosCreate()}></EmployeeTable>
                </div>
                <EmployeeModal tools={this.props.tools} req={this.axiosCreate()}></EmployeeModal>
            </div>
        );
    }

}