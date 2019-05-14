import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Modal, Button } from 'react-bootstrap';
import { getMissingComments, deleteMissingComments } from '../../../api/commentMissingApi';

class ManageMissingComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missing_comments: [],
      shouldShowDelete: false,
      selectedID: ''
    }
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.missing_comments.length === 0) {
      getMissingComments().then(res => {
        this.setState({ missing_comments: res.data })
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
    deleteMissingComments(this.state.selectedID).then(res => {
      getMissingComments().then(res => {
        this.setState({ missing_comments: res.data })
      })
    }
    );
    this.handleCloseDelete()
  }

  render() {
    const { missing_comments } = this.state;
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
                          missing_comments.length > 0 && (
                            missing_comments.map((getMissingComments, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getMissingComments.id} </td>
                                  <td> {getMissingComments.content} </td>
                                  <td> {getMissingComments.user_id} </td>
                                  <td> {getMissingComments.missing_id} </td>
                                  <td>
                                    <button onClick={() => { this.handleShowDelete(getMissingComments.id) }} className="ml-3 fa fa-trash"></button>
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
export default ManageMissingComments;