import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { getCrimeReports, deleteCrimeReport } from '../../../api/crimesapi';
import { getCategories } from '../../../api/categoriesapi';
import { Modal, Button } from 'react-bootstrap';

class ManageCrime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crimes: [],
      categories: [],
      shouldShowDelete: false,
      shouldShowAdd: false,
      selectedID: '',
      crime_ID: {},
    }
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.crimes.length === 0) {
      getCrimeReports().then(res => {
        this.setState({ crimes: res.data })
      })
    }
  }

  handleGetCategories() {
    getCategories().then(res => {
      this.setState({ categories: res.data })
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
    let user_id = sessionStorage.getItem("user_id");
    const { crimes } = this.state;
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
                      <Link to={"/report-form"} id="AddButton" className="btn btn-primary">Add Crime Report</Link>
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
                            <th>Report</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          crimes.length > 0 && (
                            crimes.map((getCrimeReports, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getCrimeReports.id} </td>
                                  <td>
                                    {
                                      getCrimeReports.image === "" ?
                                        <img src="https://pbs.twimg.com/media/CZOy-MjWIAE1T4U.jpg" width="150px" height="100px" />
                                        :
                                        <img src={getCrimeReports.image} width="150px" height="100px" />
                                    }
                                  </td>
                                  <td> {getCrimeReports.area} </td>
                                  <td id="title" > {getCrimeReports.title} </td>
                                  <td id="decription" > {getCrimeReports.description} </td>
                                  <td id="time"> {getCrimeReports.created_at} </td>
                                  <td> {getCrimeReports.category_id} </td>
                                  <td> {getCrimeReports.user_id} </td>
                                  <td>
                                    <Link to={{ pathname: `/report-post-crime/${getCrimeReports.id}`, state: { crimebyID: getCrimeReports } }} >
                                      {
                                        getCrimeReports.report === null ?
                                          0
                                          : getCrimeReports.report
                                      }
                                    </Link>
                                  </td>
                                  <td>
                                    {
                                      user_id == getCrimeReports.user_id ?
                                        <div>
                                          <Link to={{ pathname: `/edit-crime/${getCrimeReports.id}`, state: { crimebyID: getCrimeReports } }} className="ml-3 fa fa-edit"></Link>
                                        </div> : null
                                    }
                                    <Link onClick={() => { this.handleShowDelete(getCrimeReports.id) }} className="ml-3 fa fa-trash"></Link>
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
      </div>
    );
  }
}
export default ManageCrime;