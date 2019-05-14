import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Modal, Button } from 'react-bootstrap';
import { getCrimeComments, deleteCrimeComments } from '../../../api/commentCrimeApi';

class ManageCrimeComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      crime_comments: [],
      shouldShowDelete: false,
      selectedID: ''
    }
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.crime_comments.length === 0) {
      getCrimeComments().then(res => {
        this.setState({ crime_comments: res.data })
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
    deleteCrimeComments(this.state.selectedID).then(res => {
      getCrimeComments().then(res => {
        this.setState({ crime_comments: res.data })
      })
    }
    );
    this.handleCloseDelete()
  }

  render() {
    const { crime_comments } = this.state;
    return (
      <div>
        <Sidebar />
        {/* Manage Crime Comments */}
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">Manage Crime Comment</strong>
                    </div>
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Content</th>
                            <th>ID User</th>
                            <th>ID Crime</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          crime_comments.length > 0 && (
                            crime_comments.map((getCrimeComments, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getCrimeComments.id} </td>
                                  <td> {getCrimeComments.content} </td>
                                  <td> {getCrimeComments.user_id} </td>
                                  <td> {getCrimeComments.crime_id} </td>
                                  <td>
                                    <button onClick={() => { this.handleShowDelete(getCrimeComments.id) }} className="ml-3 fa fa-trash"></button>
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
            <Modal.Title>Delete This Comment</Modal.Title>
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
export default ManageCrimeComments;