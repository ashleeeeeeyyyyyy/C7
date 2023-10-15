import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MDBDataTable, MDBBtn } from 'mdbreact';

export default class EmployeeTable extends Component {

    state = {
        edit_data: {
            name: '',
            birthday: '',
            contact_number: '',
            position: 0,
            date_joined: ''
        },
        id: '',
        name: '',
        old_data: {}
    }

    handleEditModal(data) {
        let id = data.idemployees
        let name = data.name
        this.setState({
            id: id,
            name: name,
            edit_data: {
                name: data.name,
                birthday: data.birthday,
                contact_number: data.contact_number,
                position: data.position,
                date_joined: data.date_joined
            },
            old_data: {
                name: data.name,
                birthday: data.birthday,
                contact_number: data.contact_number,
                position: data.position,
                date_joined: data.date_joined
            }
        })
    }

    handleFormChanges(e, type) {
        let data_set = this.state.edit_data
        let new_data = {
            name: data_set.name,
            birthday: data_set.birthday,
            contact_number: data_set.contact_number,
            position: data_set.position,
            date_joined: data_set.date_joined
        }
        new_data[type] = e.target.value
        this.setState({ edit_data: new_data })
    }

    handleFormReset = event => {
        let old_data = this.state.old_data
        this.setState({ edit_data: old_data })
        event.preventDefault()
    }

    handleFormSubmit = event => {
        let new_url = 'employee/' + this.state.id
        let data = this.state.edit_data
        this.props.req.put(new_url, data).then(res => {
            this.props.tools.swal.fire('Success!', 'Employee\'s details updated!', 'success').then(() => {
                window.location.reload(false);
            })
        })
        event.preventDefault()
    }

    handleDeleteItem(data) {
        let new_url = 'employee/' + data.idemployees
        this.props.tools.swal.fire({
            title: 'Are you sure?',
            text: 'The entry will be removed',
            type: 'warning',
            showCancelButton: true
        }).then(res => {
            if (res['value'] === true) {
                this.props.req.delete(new_url).then(res => {
                    this.props.tools.swal.fire('Success!', 'Employee Removed!', 'success').then(() => {
                        window.location.reload(false);
                    })
                }).catch(() => {
                    this.props.tools.swal.fire('Error!', 'Item was not deleted because there is an error!', 'error').then(() => {
                        window.location.reload(false);
                    })
                })
            } else {
                this.props.tools.swal.fire('Cancelled', 'The entry was not removed!', 'info')
            }
        })
    }

    render() {

        const row_data = this.props.data_set

        for (var item in row_data) {
            let data = row_data[item]
            row_data[item]['edit'] = <MDBBtn onClick={() => this.handleEditModal(data)} className="btn btn-primary btn-block" data-toggle="modal" data-target='#EditModal'>EDIT</MDBBtn>
            row_data[item]['delete'] = <MDBBtn onClick={() => this.handleDeleteItem(data)} className="btn btn-primary btn-block">DELETE</MDBBtn>
        }

        const data = {
            columns: [
                {
                    label: 'NAME',
                    field: 'name'
                },
                {
                    label: 'BIRTHDAY',
                    field: 'birthday'
                },
                {
                    label: 'CONTACT NUMBER',
                    field: 'contact_number'
                },
                {
                    label: 'POSITION',
                    field: 'position'
                },
                {
                    label: 'DATE JOINED',
                    field: 'date_joined'
                },
                {
                    label: 'EDIT',
                    field: 'edit'
                },
                {
                    label: 'DELETE',
                    field: 'delete'
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
                <div className="modal fade" id="EditModal" tabIndex="-1" role="dialog" aria-labelledby="EmployeeEditModal" aria-hidden="true">
                    <div className='modal-dialog modal-dialog-centered modal-lg' role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">EDIT {this.state.name}'S DETAILS</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="Inventory-Add-New" onReset={this.handleFormReset} onSubmit={this.handleFormSubmit}>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>NAME</label>
                                            <input className="form-control" onChange={e => this.handleFormChanges(e, 'name')} value={this.state.edit_data.name || ''} required />
                                        </div>

                                        <div className="form-group">
                                            <label>BIRTHDAY</label>
                                            <input type="date" className="form-control" name="dates" value={this.state.edit_data.birthday || ''} onChange={e => this.handleFormChanges(e, 'birthday')} />
                                        </div>

                                        <div className="form-group">
                                            <label>CONTACT NUMBER</label>
                                            <input className="form-control" onChange={e => this.handleFormChanges(e, 'contact_number')} value={this.state.edit_data.contact_number || ''} required />
                                        </div>

                                        <div className="form-group">
                                            <label>POSITION</label>
                                            <input className="form-control" onChange={e => this.handleFormChanges(e, 'position')} value={this.state.edit_data.position || ''} required />
                                        </div>

                                        <div className="form-group">
                                            <label>DATE JOINED</label>
                                            <input type="date" className="form-control" name="dates" value={this.state.edit_data.date_joined || ''} onChange={e => this.handleFormChanges(e, 'date_joined')} />
                                        </div>

                                        <button type="submit" className="btn btn-success"><i className="fa fa-check fa-fw"></i>Save</button>
                                        <button type="reset" className="btn btn-danger"><i className="fa fa-times fa-fw"></i>Reset</button>
                                        <button className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}