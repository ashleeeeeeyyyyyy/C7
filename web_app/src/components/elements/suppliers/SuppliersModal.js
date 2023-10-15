import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EmployeeModal extends Component {


    state = {
        edit_data: {
            name: '',
            contact_number: '',
        }
    }

    handleFormChanges(e, type) {
        let data_set = this.state.edit_data
        let new_data = {
            name: data_set.name,
            contact_number: data_set.contact_number
        }
        new_data[type] = e.target.value
        this.setState({ edit_data: new_data })
    }

    handleFormReset = event => {
        let fresh_data = {
            name: '',
            contact_number: ''
        }
        this.setState({ edit_data: fresh_data })
        event.preventDefault()
    }

    handleFormSubmit = event => {
        let new_url = 'supplier'
        let data = this.state.edit_data
        console.log(data)
        this.props.req.post(new_url, data).then(res => {
            this.props.tools.swal.fire('Success!', 'Supplier Added!', 'success').then(() => {
                window.location.reload(false);
            })
        })
        event.preventDefault()
    }

    render() {
        return (
            <div className="modal fade" id="aModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className='modal-dialog modal-dialog-centered modal-lg' role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ADD A NEW SUPPLIER</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="Suppliers-Add-New" onReset={this.handleFormReset} onSubmit={this.handleFormSubmit}>
                                <div className="modal-body">
                                    
                                    <div className="form-group">
                                        <label>COMPANY</label>
                                        <input className="form-control" onChange={e => this.handleFormChanges(e, 'name')} value={this.state.edit_data.name || ''} required />
                                    </div>

                                    <div className="form-group">
                                        <label>CONTACT NUMBER</label>
                                        <input className="form-control" onChange={e => this.handleFormChanges(e, 'contact_number')} value={this.state.edit_data.contact_number || ''} required />
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
        );
    }
}