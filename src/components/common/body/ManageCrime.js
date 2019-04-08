import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getCrimeReports, deleteCrimeReport } from '../../../api/crimesapi';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

class ManageCrime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crimes: [],
      shouldShowDelete: false,
      shouldShowAdd: false,
      selectedID: ''
    }
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
  }

  componentDidMount() {
    if (this.state.crimes.length === 0) {
      getCrimeReports().then(res => {
        this.setState({ crimes: res.data })
        console.log(res.data)
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
    deleteCrimeReport(this.state.selectedID).then(res => {
      getCrimeReports().then(res => {
        this.setState({ crimes: res.data })
      }
      );
    }
    );
    this.handleCloseDelete()

  }
  /* Close modal pop up delete */

  /* Modal pop up add crime*/
  handleShowAdd(){
    this.setState({
      shouldShowAdd: true
    })
  }

  handleCloseAdd() {
    this.setState({
      shouldShowAdd: false
    })
  }
  /* Close modal pop up add  crime*/

  render() {
    const { crimes } = this.state;
    return (
      <div>
        <Sidebar />
        {/* Manage Cate */}
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">Manage Crime Report</strong>
                      <button onClick={() => { this.handleShowAdd() }} id="AddButton" className="btn btn-primary">Add Crime Report</button>
                    </div>
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th className="avatar">Avatar</th>
                            <th>Area</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th>Category</th>
                            <th>User</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          crimes.length > 0 && (
                            crimes.map((getCrimeReports, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getCrimeReports.id} </td>
                                  <td>  </td>
                                  <td> {getCrimeReports.area} </td>
                                  <td> {getCrimeReports.title} </td>
                                  <td> {getCrimeReports.description} </td>
                                  <td> {getCrimeReports.created_at} </td>
                                  <td> {getCrimeReports.category_id} </td>
                                  <td> {getCrimeReports.user_id} </td>
                                  <td>
                                    <button className="ml-3 fa fa-edit"></button>
                                    <button onClick={() => { this.handleShowDelete(getCrimeReports.id) }} className="ml-3 fa fa-trash"></button>
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
            <Modal.Title>Delete This Crime Report</Modal.Title>
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

        {/* Modal Show add crime report */}
        <Modal show={this.state.shouldShowAdd} onHide={this.handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add crime report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">Title</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"

              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseAdd}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleAdd}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ManageCrime;