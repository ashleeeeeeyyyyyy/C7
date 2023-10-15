import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SuppliersTable from '../elements/suppliers/SuppliersTable.js'
import SuppliersModal from '../elements/suppliers/SuppliersModal.js'

export default class Suppliers extends Component {

    state = {
        suppliers: []
    }

    axiosCreate() {
        let axiosReq = axios.create({
            baseURL: this.props.url
        });
        return axiosReq
    }

    generateSuppliersData() {
        this.axiosCreate().get('supplier').then(res => {
            this.setState({ suppliers: res.data.data })
        })
    }

    componentDidMount() {
        document.title = 'Suppliers'
        this.generateSuppliersData()
    }

    render() {
        return(
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h4 className="m-2 font-weight-bold text-primary">SUPPLIER&nbsp;<a href="#" data-toggle="modal" data-target="#aModal" type="button" className="btn btn-primary bg-gradient-primary" style={{ borderRadius: "0px" }}><i className="fas fa-fw fa-plus"></i></a></h4>
                </div>
                <div className="card-body">
                    <SuppliersTable tools={this.props.tools} data_set={this.state.suppliers} req={this.axiosCreate()}></SuppliersTable>
                </div>
                <SuppliersModal tools={this.props.tools} req={this.axiosCreate()}></SuppliersModal>
            </div>
        );
    }

}