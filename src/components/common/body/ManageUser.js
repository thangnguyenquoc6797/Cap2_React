import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getUser, deleteUser } from '../../../api/userapi';
import { Modal, Button } from 'react-bootstrap';

class ManageUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      shouldShow: false,
      selectIdUser: ''
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.users.length === 0) {
      getUser().then(res => {
        this.setState({ users: res.data })
      });
    }
  }

  

  handleShow = (id) => {
    this.setState({
      selectIdUser: id,
      shouldShow: true
    })
  }

  handleClose(){
    this.setState({
      shouldShow: false
    })
  }

  handleDelete(){
    deleteUser(this.state.selectIdUser).then(res => {
      getUser().then(res => {
        this.setState({ users: res.data })
      });
    })
    this.handleClose()
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <Sidebar />
        {/* Manage User */}
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">Manage User</strong>
                    </div>
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Full name</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>ID card</th>
                            <th>Role</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          users.length > 0 && (
                            users.map((getUser, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getUser.id} </td>
                                  <td> {getUser.email} </td>
                                  <td> {getUser.fullname} </td>
                                  <td> {getUser.phone_number} </td>
                                  <td> {getUser.address} </td>
                                  <td> {getUser.id_card_number} </td>
                                  <td> #5469 </td>
                                  <td>
                                    <button onClick={() => { this.handleShow(getUser.id) }} className="ml-3 fa fa-trash"></button>
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
        <Modal show={this.state.shouldShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete This Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
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
export default ManageUser;