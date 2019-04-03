import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getCategories, addCategories, deleteCategories } from '../../../api/categoriesapi';
import { Modal, Button } from 'react-bootstrap';

class ManageCate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: '',
      categories: [],
      isShowCategory: true,
      shouldShow: false,
      selectedID: ''
    }
    this.handShowInputCategory = this.handShowInputCategory.bind(this);
    this.handleAddCate = this.handleAddCate.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.categories.length === 0) {
      getCategories().then(res => {
        this.setState({ categories: res.data })
        console.log(res.data)
      }
      );
    }
  }

  handShowInputCategory() {
    this.setState({
      isShowCategory: !this.state.isShowCategory
    })
  }

  handleChangInputAddCate = event => {
    this.setState({
      category_name: event.target.value
    })
  }

  handleShow = (id) => {
    this.setState({
      selectedID: id,
      shouldShow: true
    })
  }

  handleClose() {
    this.setState({
      shouldShow: false
    })
  }

  handleDelete() {
    deleteCategories(this.state.selectedID).then(res => {
      getCategories().then(res => {
        this.setState({ categories: res.data })
      }
      );
    }
    );
    this.handleClose()
  }

  handleAddCate() {
    const categories = {};
    if (this.state.category_name.length > 0) {
      categories['name_category'] = this.state.category_name;
      addCategories(categories).then(res => {
        getCategories().then(res => {
          this.setState({ categories: res.data })
          console.log(res.data)
        }
        );
        this.setState({
          category_name: ''
        })
      }
      );
    } else {
      alert("You have to text in input")
    }
  }

  render() {
    const { categories } = this.state;
    let btnAdd = "";
    if (this.state.isShowCategory) {
      btnAdd = <button onClick={this.handShowInputCategory} id="AddButton" type="button" className="btn btn-primary">Add Category</button>
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
                      <strong className="card-title">Manage User</strong>
                      {
                        btnAdd
                      }
                    </div>
                    {
                      !this.state.isShowCategory &&
                      <div className="input-group mb-3">
                        <input value={this.state.category_name} onChange={this.handleChangInputAddCate} type="text" className="form-control" placeholder="Category's name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                          categories.length > 0 && (
                            categories.map((getCategories, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getCategories.id} </td>
                                  <td> {getCategories.name_category} </td>
                                  <td>
                                    <a href="none" className="ml-3 fa fa-edit"></a>
                                    <button onClick={() => { this.handleShow(getCategories.id) }} className="ml-3 fa fa-trash"></button>
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
export default ManageCate;