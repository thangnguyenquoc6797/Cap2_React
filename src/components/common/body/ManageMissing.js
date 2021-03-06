import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getMissingReport, deleteMissingReport } from '../../../api/missingapi'
import { Modal, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'

class ManageMissing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      missing: [],
      report: [],
      selectedID: '',
      shouldShowDelete: false
    }
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.missing.length === 0) {
      getMissingReport().then(res => {
        this.setState({ missing: res.data })
      })
    }
  }

  /* Modal pop up delete */
  handleShowDelete = (id) => {
    this.setState({
      selectedID: id,
      shouldShowDelete: true
    })
  }

  handleCloseDelete() {
    this.setState({
      shouldShowDelete: false
    })
  }

  handleDelete() {
    deleteMissingReport(this.state.selectedID).then(res => {
      getMissingReport().then(res => {
        this.setState({ missing: res.data })
      })
    })
    this.handleCloseDelete()
  }


  render() {
    let user_id = sessionStorage.getItem("user_id");
    let count_report = 0;
    const { missing } = this.state;
    const { report } = this.state;
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
                      <strong className="card-title">Manage Missing Report</strong>
                      <Link to={"/missing-form"} id="AddButton" className="btn btn-primary">Add Missing Report</Link>
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
                            <th>Phone Number</th>
                            <th>User</th>
                            <th>Report</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        {
                          missing.length > 0 && (
                            missing.map((getMissingReport, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getMissingReport.id} </td>
                                  <td>
                                    {
                                      getMissingReport.image === "" ?
                                        <img src="https://pbs.twimg.com/media/CZOy-MjWIAE1T4U.jpg" width="150px" height="100px" />
                                        :
                                        <img src={getMissingReport.image} width="150px" height="100px" />
                                    }
                                  </td>
                                  <td id="title" > {getMissingReport.title} </td>
                                  <td id="decription" > {getMissingReport.description} </td>
                                  <td id="time" > {getMissingReport.created_at} </td>
                                  <td> {getMissingReport.phone_number} </td>
                                  <td> {getMissingReport.user_id} </td>
                                  <td>
                                    <Link to={{ pathname: `/report-post-missing/${getMissingReport.id}`, state: { MissingbyID: getMissingReport } }} >
                                      {
                                        getMissingReport.report === null ?
                                          0
                                          : getMissingReport.report
                                      }
                                    </Link>
                                  </td>
                                  <td>
                                    {
                                      user_id == getMissingReport.user_id ?
                                        <div>
                                          <Link to={{ pathname: `/edit-missing/${getMissingReport.id}`, state: { MissingbyID: getMissingReport } }} className="ml-3 fa fa-edit"></Link>
                                        </div> : null
                                    }
                                    <Link onClick={() => { this.handleShowDelete(getMissingReport.id) }} className="ml-3 fa fa-trash"></Link>
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
export default ManageMissing;