import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getComplaintReport } from '../../../api/complaintapi'
import { Modal, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'

class ManageComplaint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complaint: [],
      selectedID: '',
      shouldShowDelete: false
    }
    // this.handleCloseDelete = this.handleCloseDelete.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.complaint.length === 0) {
      getComplaintReport().then(res => {
        this.setState({ complaint: res.data })
      })
    }
  }

  // /* Modal pop up delete */
  // handleShowDelete = (id) => {
  //   this.setState({
  //     selectedID: id,
  //     shouldShowDelete: true
  //   })
  // }

  // handleCloseDelete() {
  //   this.setState({
  //     shouldShowDelete: false
  //   })
  // }

  // handleDelete() {
  //   deleteMissingReport(this.state.selectedID).then(res => {
  //     getMissingReport().then(res => {
  //       this.setState({ missing: res.data })
  //     })
  //   })
  //   this.handleCloseDelete()
  // }

  render() {
    const { complaint } = this.state;
    return (
      <div>
        <Sidebar />
        {/* Missing person */}
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">Manage Complaint Report</strong>
                      <Link to={"/complaint-form"} id="AddButton" className="btn btn-primary">Add Complaint Report</Link>
                    </div>
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th className="avatar">Avatar</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th>Category</th>
                            <th>Id User</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        {
                          complaint.length > 0 && (
                            complaint.map((getComplaintReport, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getComplaintReport.id} </td>
                                  <td> <img src={getComplaintReport.image} width="150px" height="100px"/> </td>
                                  <td id="title" > {getComplaintReport.title} </td>
                                  <td id="decription" > {getComplaintReport.content} </td>
                                  <td> {getComplaintReport.created_at} </td>
                                  <td> {getComplaintReport.complaint_categories_id} </td>
                                  <td> {getComplaintReport.user_id} </td>
                                  <td>
                                    <Link  className="ml-3 fa fa-edit"></Link>
                                    <Link  className="ml-3 fa fa-trash"></Link>
                                  </td>
                                </tr>
                              </tbody>
                            })
                          )
                        }
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal show delete */}
        <Modal show={this.state.shouldShowDelete} onHide={this.handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Delete This Missing Person Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseDelete}>
              Close
                        </Button>
            <Button variant="primary" onClick={this.handleDelete}>
              Delete
                        </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ManageComplaint;