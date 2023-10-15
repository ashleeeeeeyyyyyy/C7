import React, { Component } from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';

export default class TransactionTable extends Component {

    state = {
        transactions: [],
        transaction_details: {},
        total_price: 0.0
    }

    handleModalState(data) {
        this.props.req.get('tdetails', {
            params: {
                special_id: data.special_id
            }
        }).then(res => {
            var data = res.data.data
            var total = data.map(e => parseFloat(e.total_price)).reduce((a, b) => a + b, 0)
            this.setState({ transactions: data, total_price: total })
        })
        this.setState({ transaction_details: data })
    }

    render() {

        const row_data = this.props.data_set

        for (var item in row_data) {
            let data = row_data[item]
            row_data[item]['details'] = <MDBBtn className="btn btn-primary btn-block" onClick={() => this.handleModalState(data)} data-toggle="modal" data-target='#TDetailsModal'>DETAILS</MDBBtn>
        }

        const data = {
            columns: [
                {
                    label: 'RECEIPT NUMBER',
                    field: 'transaction_id'
                },
                {
                    label: 'TRANSACTION DATE',
                    field: 'transaction_date'
                },
                {
                    label: 'TOTAL PRICE',
                    field: 'total_price'
                },
                {
                    label: 'NOTES',
                    field: 'notes'
                },
                {
                    label: 'OPTIONS',
                    field: 'details'
                }
            ],
            rows: row_data
        }

        return (
            <div>
                < MDBDataTable
                    striped
                    hover
                    data={data}
                    entries={5}
                    entriesOptions={[5, 10, 25, 50]}
                    noBottomColumns
                    btn
                />
                <div className='modal fade' id='TDetailsModal' tabIndex='-1' role='dialog' aria-labelledby='TDetailsModal' aria-hidden='true'>
                    <div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='exampleModalLongTitle'>DETAILS</h5>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <table className='table table-hover table-dark table-striped table-sm'>
                                    <thead>
                                        <tr>
                                            <th>ITEM ID</th>
                                            <th>ITEM NAME</th>
                                            <th>UNITS SOLD</th>
                                            <th>PRICE PER UNIT</th>
                                            <th>TOTAL PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.transactions.map((list, index) => (
                                            <tr key={index}>
                                                <td>{list.item_id}</td>
                                                <td>{list.item_name}</td>
                                                <td>{list.units_sold}</td>
                                                <td>{list.selling_price}</td>
                                                <td>{list.total_price}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="3"></td>
                                            <td>Total Price:</td>
                                            <td>{this.state.total_price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}