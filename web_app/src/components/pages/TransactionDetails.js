import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TransactionTable from '../elements/transaction/TransactionTable.js';

export default class TrasactionDetails extends Component {

    state = {
        transactions: []
    }

    axiosCreate() {
        let axiosReq = axios.create({
            baseURL: this.props.url
        });
        return axiosReq
    }

    generateTableData() {
        this.axiosCreate().get('transactions').then(res => {
            this.setState({ transactions: res.data.data })
        })
    }

    componentDidMount() {
        document.title = 'Transaction Details'
        this.generateTableData()
    }

    render() {
        return (
            <div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h4 className="m-2 font-weight-bold text-primary">TRANSACTION DETAILS</h4>
                    </div>
                    <div className="card-body">
                        <TransactionTable data_set={this.state.transactions} req={this.axiosCreate()}></TransactionTable>
                    </div>
                </div>
            </div>
        );
    }

}