import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getComplaintCategories } from '../../../api/complaintcateapi';
import { uploadImage } from '../../../api/imgurapi';
import { addComplaintReport } from '../../../api/complaintapi';
import ReactLoading from 'react-loading';
import { Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'

class ComplaintReportForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      complaint_title: '',
      complaint_category: '',
      complaint_content: '',
      complaint_img: '',
      isLoading: false,
      message: {},
      shouldShowSuccess: false,
    }
    this.validate = this.validate.bind(this)
  }

  handleGetCategories() {
    getComplaintCategories().then(res => {
      this.setState({ categories: res.data })
    })
  }

  uploadImage = (event) => {
    this.setState({
      isLoading: true
    })
    const imgFile = event.target.files[0];
    uploadImage(imgFile).then(response => {
      const imageUrl = response.data.data.link;
      this.setState({ complaint_img: imageUrl, isLoading: false })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.handleGetCategories();
  }

  validate() {
    let message = {};
    if (this.state.complaint_title.length < 5 || this.state.complaint_title.length > 50) {
      message["title"] = "Title must be between 5 to 50 characters"
    } else if (this.state.complaint_content.length <= 10) {
      message["description"] = "Description must better than 10"
    }
    this.setState({
      message: message
    })
  }

  /* Add complaint*/
  handleChangInputTitleAddcomplaint = event => {
    this.setState({
      complaint_title: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const complaint_report = {};
    this.validate();
    if (!this.state.complaint_category) {
      this.setState({
        complaint_category: this.state.categories[0].id
      })
    } else if (this.state.message.length > 0) {
      alert("Fail")
    }
    else {
      complaint_report["title"] = this.state.complaint_title;
      complaint_report["complaint_categories_id"] = this.state.complaint_category;
      complaint_report["content"] = this.state.complaint_content;
      complaint_report["image"] = this.state.complaint_img;
      complaint_report["user_id"] = sessionStorage.getItem("user_id");
      addComplaintReport(complaint_report).then(res => {
        this.setState({
          shouldShowSuccess: true
        })
      })
    }
  }

  handleChangInputCateAddcomplaint = event => {
    this.setState({
      complaint_category: event.target.value
    })
  }

  handleChangInputContentAddcomplaint = event => {
    let message = {};
    message["description"] = '';
    this.setState({
      complaint_content: event.target.value,
      message: message
    })
  }

  /* CLOSE Add complaint*/

  render() {
    const { categories } = this.state;
    return (
      <div>
        <Sidebar />
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card-header">
                    <strong className="card-title info-color white-text text-center py-4">Add Complaint Report</strong>
                  </div>

                  <div className="card">
                    {/*Card content*/}
                    <div className="card-body px-md-5">
                      {/* Form */}
                      <form className="text-center" style={{ color: '#757575' }} onSubmit={this.handleSubmit} >

                        <div className="row">
                          {/* Title */}
                          <div className="form-group mt-3 col-md-6">
                            <strong>Title</strong>
                            <input onBlur={this.validate} required type="text" onChange={this.handleChangInputTitleAddcomplaint} className="form-control" />
                            <p className="text-danger">{this.state.message["title"]}</p>
                          </div>

                          {/* complaint category */}
                          <div className="form-group mt-3 col-md-6">
                            <strong>Category</strong>
                            <select className="form-control" onChange={this.handleChangInputCateAddcomplaint}>
                              {
                                categories.length > 0 && (
                                  categories.map((category, index) => {
                                    return (<option key={index} value={category.id}>{category.name}</option>)
                                  })
                                )
                              }
                            </select>
                          </div>
                        </div>

                        {/*Message*/}
                        <div className="form-group mt-3">
                          <strong>Description</strong>
                          <textarea className="form-control" required onBlur={this.validate} onChange={this.handleChangInputContentAddcomplaint} />
                          <p className="text-danger">{this.state.message["description"]}</p>
                        </div>

                        {/*Image*/}
                        <div className="form-group">
                          <strong className="col-form-label">Image Discription</strong>
                          {
                            this.state.complaint_img ?
                              <div>
                                <p>
                                  <img src={this.state.complaint_img} width="150px" height="100px" />
                                </p>
                                <div className="col-md-12">
                                  <input type="file"
                                    className="custom-file-input"
                                    onChange={this.uploadImage}
                                    id="uploadImage" />
                                  <label className="custom-file-label">Choose File</label>
                                  {
                                    this.state.isLoading && (
                                      <ReactLoading type={"cylon"} color={"black"} height={"1%"} width={"5%"} />
                                    )
                                  }
                                </div>
                              </div> :
                              <div className="col-md-12">
                                <input type="file"
                                  className="custom-file-input"
                                  onChange={this.uploadImage}
                                  id="uploadImage" />
                                <label className="custom-file-label">Choose File</label>
                                {
                                  this.state.isLoading && (
                                    <ReactLoading type={"cylon"} color={"black"} height={"1%"} width={"5%"} />
                                  )
                                }
                              </div>
                          }
                        </div>
                        <button className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Send</button>
                      </form>
                      {/* Form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.shouldShowSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Add Post Complaint Report Successfull
          </Modal.Body>
          <Modal.Footer>
            <Link to="/complaints" variant="secondary" >
              Close
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ComplaintReportForm;