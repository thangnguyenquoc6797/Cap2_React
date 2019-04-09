import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getCrimeReports, deleteCrimeReport } from '../../../api/crimesapi';
import {getCategories} from '../../../api/categoriesapi';
import { Modal, Button, InputGroup, FormControl, Form, ButtonToolbar } from 'react-bootstrap';

class ManageCrime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crimes: [],
      categories: [],
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
      })
    }
  }

  handleGetCategories(){
    getCategories().then(res =>{
      this.setState({categories: res.data})
    })
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
  handleShowAdd() {
    this.handleGetCategories()
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

  /* Add crime*/
  handleChangInputTitleAddCrime = event => {
    this.setState({
      crime_title: event.target.value
    })
  }

  handleChangInputCateAddCrime = event => {
    this.setState({
      crime_category: event.target.value
    })
  }

  handleChangInputContentAddCrime = event => {
    this.setState({
      crime_content: event.target.value
    })
  }

  /* CLOSE Add crime*/

  render() {
    const { crimes } = this.state;
    const {categories} = this.state;
    return (
      <div>
        <Sidebar />
        {/* Manage Crime */}
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
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="email" placeholder="Title of post" 
                  value={this.state.crime_title}
                  onChange={this.handleChangInputTitleAddCrime}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Crime Category</Form.Label>
                <Form.Control as="select" value={this.state.crime_category} onChange={this.handleChangInputCateAddCrime}>
                  {
                    categories.map((getCategories, index) => {
                      return <option key={index}> {getCategories.name_category} </option>
                    })
                  }                 
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Area</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows="3" 
                  value={this.state.crime_content}
                  onChange={this.handleChangInputContentAddCrime}
                />
              </Form.Group>
              <ButtonToolbar>
                <Button variant="primary" size="sm">
                  CHOOSE IMAGE
                </Button>
              </ButtonToolbar>
            </Form>
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
        {/* CLOSE Modal Show add crime report */}
      </div>
    );
  }
}
export default ManageCrime;