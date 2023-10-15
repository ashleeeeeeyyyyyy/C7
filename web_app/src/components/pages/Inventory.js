import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductModal from '../elements/inventory/ProductModal.js';
import InventoryTable from '../elements/inventory/InventoryTable.js';

export default class Inventory extends Component {

  state = {
    inv: []
  }

  componentDidMount() {
    document.title = 'Inventory'
    this.generateTableData();
  }

  axiosCreate() {
    let axiosReq = axios.create({
      baseURL: this.props.url
    });
    return axiosReq
  }

  generateTableData() {
    this.axiosCreate().get('inventory').then(res => {
      this.setState({ inv: res.data.data })
    })
  }

  render() {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-2 font-weight-bold text-primary">INVENTORY&nbsp;<a href="#" data-toggle="modal" data-target="#aModal" type="button" className="btn btn-primary bg-gradient-primary" style={{ borderRadius: "0px" }}><i className="fas fa-fw fa-plus"></i></a></h4>
        </div>
        <div className="card-body">
          <InventoryTable tools={this.props.tools} data_set={this.state.inv} req={this.axiosCreate()}></InventoryTable>
        </div>
        <ProductModal tools={this.props.tools} req={this.axiosCreate()}></ProductModal>
      </div>
    );
  }
}