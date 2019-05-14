import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getReportCategories, addReportCategories, deleteReportCategories} from '../../../api/reportCategoriesapi';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class ManageReportCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report_category_name: '',
      report_categories: [],
      isShowCategory: true,
      shouldShowDelete: false
    }
    this.handShowInputCategory = this.handShowInputCategory.bind(this);
    this.handleAddCate = this.handleAddCate.bind(this);
    this.handleShowDelete = this.handleShowDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.report_categories.length === 0) {
      getReportCategories().then(res => {
        this.setState({ report_categories: res.data })
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
      report_category_name: event.target.value
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
    deleteReportCategories(this.state.selectedID).then(res => {
      getReportCategories().then(res => {
        this.setState({ report_categories: res.data })
      }
      );
    }
    );
    this.handleCloseDelete()
  }

  handleAddCate() {
    const report_categories = {};
    if (this.state.report_category_name.length > 0) {
      report_categories['name'] = this.state.report_category_name;
      addReportCategories(report_categories).then(res => {
        getReportCategories().then(res => {
          this.setState({ report_categories: res.data })
        }
        );
        this.setState({
          report_category_name: ''
        })
      }
      );
    } else {
      alert("You have to text in input")
    }
  }

  render() {
    const { report_categories } = this.state;
    let btnAdd = "";
    if (this.state.isShowCategory) {
      btnAdd = <button onClick={this.handShowInputCategory} id="AddButton" type="button" className="btn btn-primary">Add Report</button>
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
                      <strong className="card-title">Manage Report Category</strong>
                      {
                        btnAdd
                      }
                    </div>
                    {
                      !this.state.isShowCategory &&
                      <div className="input-group mb-3">
                        <input value={this.state.report_category_name} onChange={this.handleChangInputAddCate} type="text" className="form-control" placeholder="Report Category's name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                          report_categories.length > 0 && (
                            report_categories.map((getReportCategories, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getReportCategories.id} </td>
                                  <td> {getReportCategories.name} </td>
                                  <td>
                                    <button className="ml-3 fa fa-edit"></button>
                                    <button onClick={() => { this.handleShowDelete(getReportCategories.id) }} className="ml-3 fa fa-trash"></button>
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
            <Modal.Title>Edit This Category</Modal.Title>
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
export default withRouter(ManageReportCategory);