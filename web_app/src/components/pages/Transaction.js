import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Transaction extends Component {

    state = {
        items: [
            {
                id: 1,
                item_id: '',
                name: '',
                units: 0,
                price: 0,
                qty: 0
            }
        ],
        notes: '',
        date: '',
        transaction_id: '',
        special_id: 0,
        inv: []
    }

    axiosCreate() {
        let axiosReq = axios.create({
            baseURL: this.props.url
        });
        return axiosReq
    }

    generateInventoryItems() {
        this.axiosCreate().get('inventory').then(res => {
            this.setState({ inv: res.data.data })
        })
    }

    componentDidMount() {
        document.title = 'Transaction'
        this.generateInventoryItems()
        var date = new Date();
        var date_now = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
        this.setState({ date: date_now })
    }

    handleAddRow(id) {
        let items = this.state.items
        let new_items = items
        new_items.push({
            id: id,
            item_id: '',
            name: '',
            units: 0,
            price: 0,
            qty: 0
        })
        let renew_id = []
        for (var counter in new_items) {
            var new_data = {
                id: parseInt(counter) + 1,
                item_id: '',
                name: '',
                units: 0,
                price: 0,
                qty: 0
            }
            renew_id.push(new_data)
        }
        this.setState({ items: new_items })
    }

    handleInputChange(e, index, type) {
        var items = this.state.items
        var inv = this.state.inv
        items[index][type] = e.target.value
        var get_index = -1

        if (type === 'units' || type === 'name') {
            get_index = this.state.inv.map(e => e.item_name).indexOf(items[index]['name'])
        }

        if (type === 'units' && get_index !== -1 || type === 'name' && get_index !== -1) {
            items[index]['price'] = inv[get_index]['selling_price'] * items[index]['units']
            items[index]['qty'] = inv[get_index]['current_inventory']
            items[index]['item_id'] = inv[get_index]['item_id']
        }

        if (e.target.value === '' && type === 'name') {
            items[index]['price'] = 0
            items[index]['qty'] = 0
            items[index]['item_id'] = ''
        }

        this.setState({ items: items })
    }

    handleRemoveRow(id) {
        var data = this.state.items
        delete data[id - 1]
        this.setState({ items: data })
    }

    handleNotes(e) {
        this.setState({ notes: e.target.value })
    }

    handlerCalendarChange(e) {
        this.setState({ date: e.target.value })
    }

    handleTransactionIDChange(e) {
        this.setState({ transaction_id: e.target.value })
    }

    continueTransactionProcess(special_id) {
        var data = this.state
        var special_id = special_id

        try {

            let transaction_details = []
            let inventory = []

            for (var item in data.items) {
                var inv_index = this.state.inv.map(e => e.item_name).indexOf(data.items[item]['name'])
                var inv_item_details = this.state.inv[inv_index]
                var json_item = {
                    item_id: inv_item_details.item_id,
                    special_id: special_id,
                    item_name: inv_item_details.item_name,
                    units_sold: parseInt(data.items[item]['units']),
                    selling_price: inv_item_details.selling_price,
                    total_price: data.items[item]['price']
                }

                let new_inventory = parseInt(inv_item_details.current_inventory) - parseInt(data.items[item]['units'])
                let inv_data = {
                    item_id: json_item.item_id,
                    current_inventory: new_inventory
                }
                transaction_details.push(json_item)
                inventory.push(inv_data)
            }

            let post_data = {
                transaction_details: transaction_details,
                new_inventory: inventory
            }

            this.axiosCreate().post('transactions/create', JSON.stringify(post_data)).then(res => {
                this.props.tools.swal.fire('Success!', 'Transaction Success!', 'success').then(() => {
                    window.location.reload(false);
                })
            })
        } catch (e) {
            console.log(e)
            alert('Process Error!')
        }
    }

    handleSubmitForm = event => {
        event.preventDefault()
        var data = this.state
        var items = data.items
        var items_info = []
        var count = {}
        var has_duplicate = false
        var invalid_qty = false 

        for (var item in items) {
            items_info.push(items[item]['item_id'])
        }

        items_info.forEach(function (i) { count[i] = (count[i] || 0) + 1; });

        for (var c in count) {
            if (count[c] > 1) {
                has_duplicate = true
            }
        }

        for (var c in items) {
            if (parseInt(items[c]['units']) > items[c]['qty']) {
                invalid_qty = true
            }
        }

        if (has_duplicate === false && invalid_qty === false) {
            var total_price = data.items.map(e => parseFloat(e.price)).reduce((a, b) => a + b, 0)
            var json = {
                transaction_id: data.transaction_id,
                total_price: total_price,
                notes: data.notes,
                transaction_date: data.date
            }

            this.axiosCreate().post('transactions', json).then(res => {
                this.continueTransactionProcess(res.data.data.special_id)
            })
        } else if (has_duplicate === true) {
            this.props.tools.swal.fire('Error!', 'There are duplicate items in your transaction', 'error')
        } else if (invalid_qty === true) {
            this.props.tools.swal.fire('Error!', 'Some of the items are not enough to satisfy your transaction', 'error')
        } else {
            this.props.tools.swal.fire('Error!', 'Your transaction is invalid, please check your data!', 'error')
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <br /><br />
                        <form id="add_trans" onSubmit={this.handleSubmitForm}>
                            <div className="table-responsive">
                                <div className="input-group">
                                    <input onChange={e => this.handleTransactionIDChange(e)} className="form-control form-control-lg" type="text" id="trans_id" name="trans_id" placeholder="RECEIPT NUMBER" required />
                                    <input type="date" className="form-control form-control-lg" name="dates" value={this.state.date} onChange={e => this.handlerCalendarChange(e)} />
                                </div>
                                <br />
                                <textarea onChange={e => this.handleNotes(e)} rows="4" id="notes" cols="100%" name="notes" form="add_trans" placeholder="Enter Notes here" style={{ width: "100%" }}></textarea>
                                <table className="table table-bordered" id="dynamic_field">
                                    <tbody>
                                        {this.state.items.map((list, index) => (
                                            <tr key={index}>
                                                <td><input type="text" placeholder="ENTER ITEM NAME" onChange={e => this.handleInputChange(e, index, 'name')} value={this.state.items[index].name || ''} className="form-control" list="inventory" required /></td>
                                                <td><input type="number" onChange={e => this.handleInputChange(e, index, 'units')} value={this.state.items[index].units || 0} placeholder="ENTER THE QUANTITY OF UNITS" className="form-control name_list" required /></td>
                                                <td><input type="number" className="form-control name_list" onChange={e => this.handleInputChange(e, index, 'price')} value={this.state.items[index].price || 0} required /></td>
                                                <td className="qty-cell"><span>Available Qty: {this.state.items[index].qty}</span></td>
                                                <td><button onClick={() => this.handleRemoveRow(index + 1)} type="button" className="btn btn-danger btn_remove">X</button></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: "right" }}>Total Price: {this.state.items.map(e => parseFloat(e.price)).reduce((a, b) => a + b, 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className='btn btn-primary' type='submit'>SUBMIT TRANSACTION</button>
                            </div>
                            <datalist id="inventory">
                                {this.state.inv.map((list, index) => (
                                    <option value={list.item_name} key={index}>{list.item_name}</option>
                                ))}
                            </datalist>
                        </form>
                    </div>
                </div>
                <button id="transaction-add-more-btn" type="button" onClick={() => this.handleAddRow()} className="btn btn-success">+</button>
            </div>
        );
    }
}
