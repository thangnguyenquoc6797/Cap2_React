import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getComplaintCategories, addComplaintCate, deleteComplaintCate, editComplaintCate, getComplaintCategoriesbyID } from '../../../api/complaintcateapi'
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class ManageComplaintCate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaint_category_name: '',
      complaint_categories: [],
      isShowCategory: true,
      shouldShowDelete: false,
      shouldShowEdit: false,
      selectedID: '',
      selectedName: ''
    }
    this.handShowInputCategory = this.handShowInputCategory.bind(this);
    this.handleAddCate = this.handleAddCate.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    if (this.state.complaint_categories.length === 0) {
      getComplaintCategories().then(res => {
        this.setState({ complaint_categories: res.data })
      }
      );
    }
  }

  /* Function add complaint categories */

  handShowInputCategory() {
    this.setState({
      isShowCategory: !this.state.isShowCategory
    })
  }

  handleChangInputAddCate = event => {
    this.setState({
      complaint_category_name: event.target.value
    })
  }

  handleAddCate() {
    const categories = {};
    if (this.state.complaint_category_name.length > 0) {
      categories['name'] = this.state.complaint_category_name;
      addComplaintCate(categories).then(res => {
        getComplaintCategories().then(res => {
          this.setState({ complaint_categories: res.data })
        }
        );
        this.setState({
          complaint_category_name: ''
        })
      }
      );
    } else {
      alert("You have to text in input")
    }
  }

  /* Function delete complaint category */

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
    deleteComplaintCate(this.state.selectedID).then(res => {
      getComplaintCategories().then(res => {
        this.setState({ complaint_categories: res.data })
      }
      );
    }
    );
    this.handleCloseDelete()
  }

  /* Function edit complaint category */

  handleShowEdit = (id) => {
    getComplaintCategoriesbyID(id).then(res => {
      this.setState({
        selectedID: id,
        selectedName: res.data.name,
        shouldShowEdit: true
      })
    })
  }

  handleCloseEdit() {
    this.setState({
      shouldShowEdit: false
    })
  }

  handleChangInputEditCate = event => {
    this.setState({
      selectedName: event.target.value
    })
  }

  handleEdit() {
    const categoriesName = {};
    if (this.state.selectedName.length > 0) {
      categoriesName['name'] = this.state.selectedName;
      editComplaintCate(this.state.selectedID, categoriesName).then(res => {
        getComplaintCategories().then(res => {
          this.setState({ complaint_categories: res.data })
        });
      });
    }
    this.handleCloseEdit()
  }

  render() {
    const { complaint_categories } = this.state;
    let btnAdd = "";
    if (this.state.isShowCategory) {
      btnAdd = <button onClick={this.handShowInputCategory} id="AddButton" type="button" className="btn btn-primary">Add Complaint Category</button>
    } else {
      btnAdd = <button onClick={this.handShowInputCategory} id="AddButton" type="button" className="btn btn-warning">Cancle</button>
    }

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
                      <strong className="card-title">Manage Complaint Categories</strong>
                      {
                        btnAdd
                      }
                    </div>
                    {
                      !this.state.isShowCategory &&
                      <div className="input-group mb-3">
                        <input value={this.state.complaint_category_name} onChange={this.handleChangInputAddCate} type="text" className="form-control" placeholder="Complaint Category's name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <button onClick={this.handleAddCate} className="btn btn-outline-secondary">Submit</button>
                        </div>
                      </div>
                    }
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          complaint_categories.length > 0 && (
                            complaint_categories.map((getComplaintCate, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getComplaintCate.id} </td>
                                  <td> {getComplaintCate.name} </td>
                                  <td>
                                    <button onClick={() => { this.handleShowEdit(getComplaintCate.id, getComplaintCate.name) }} className="ml-3 fa fa-edit"></button>
                                    <button onClick={() => { this.handleShowDelete(getComplaintCate.id) }} className="ml-3 fa fa-trash"></button>
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
            <Modal.Title>Delete This Category</Modal.Title>
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

        {/* Modal show edit */}
        <Modal show={this.state.shouldShowEdit} onHide={this.handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit This Complaint Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">{this.state.selectedID}</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.selectedName}
                onChange={this.handleChangInputEditCate}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleEdit}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default withRouter(ManageComplaintCate);