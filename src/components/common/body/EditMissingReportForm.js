import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { uploadImage } from '../../../api/imgurapi';
import { getMissingReportbyID, editMissingReport } from '../../../api/missingapi';
import ReactLoading from 'react-loading';
import { Modal, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'

class EditMissingReportForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      missings: [],
      missing_title: '',
      missing_content: '',
      missing_phone: '',
      missing_img: '',
      isLoading: false,
      message: {},
      shouldShowSuccess: false,
      missing: this.props.location.state.MissingbyID,
    }
    this.validate = this.validate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      missing_title: this.state.missing.title,
      missing_content: this.state.missing.description,
      missing_phone: this.state.missing.phone_number,
      missing_img: this.state.missing.image
    })
  }

  handleChangInputContentEditMissing = event => {
    this.setState({
      missing_content: event.target.value
    })
  }

  handleChangInputTitleEditMissing = event => {
    this.setState({
      missing_title: event.target.value
    })
  }

  handleChangInputPhoneEditMissing = event => {
    this.setState({
      missing_phone: event.target.value
    })
  }

  uploadImage = (event) => {
    this.setState({
      isLoading: true
    })
    const imgFile = event.target.files[0];
    uploadImage(imgFile).then(response => {
      const imageUrl = response.data.data.link;
      this.setState({ missing_img: imageUrl, isLoading: false })
    }).catch(err => {
      console.log(err)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const missing = {};
    this.validate();
    if (this.state.missing_title.length > 0 && this.state.missing_content.length > 0 && this.state.missing_phone.length > 0) {
      missing['title'] = this.state.missing_title
      missing['description'] = this.state.missing_content
      missing['phone_number'] = this.state.missing_phone
      missing['image'] = this.state.missing_img
      editMissingReport(this.state.missing.id, missing).then(res => {
        this.setState({
          shouldShowSuccess: true
        })
      })
    }else if (this.state.message.length > 0) {
      alert("Fail")
    }
  }

  validate() {
    let message = {};
    if (this.state.missing_title.length < 5 || this.state.missing_title.length > 50) {
      message["title"] = "Title must be between 5 to 50 characters"
    } else if (this.state.missing_content.length <= 10) {
      message["description"] = "Description must better than 10"
    } else if (this.state.missing_phone.length > 12 || this.state.missing_phone.length < 10) {
      message["phone"] = "Phone number must be between 10 to 12 characters"
    }
    this.setState({
      message: message
    })
  }

  render() {
    const { missings } = this.state;
    return (
      <div>
        <Sidebar />
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card-header">
                    <strong className="card-title info-color white-text text-center py-4">Add Missing Report</strong>
                  </div>
                  <div className="card">
                    {/*Card content*/}
                    <div className="card-body px-md-5">
                      {/* Form */}
                      <form className="text-center" style={{ color: '#757575' }} >
                        {/* Title */}
                        <div className="md-form mt-3">
                          <strong>Title</strong>
                          <input defaultValue={this.state.missing_title} onBlur={this.validate} required type="text" onChange={this.handleChangInputTitleEditMissing} className="form-control" />
                          <p className="text-danger">{this.state.message["title"]}</p>
                        </div>

                        {/*Description*/}
                        <div className="form-group mt-3">
                          <strong>Description</strong>
                          <textarea value={this.state.missing_content} className="form-control" required onBlur={this.validate} onChange={this.handleChangInputContentEditMissing} />
                          <p className="text-danger">{this.state.message["description"]}</p>
                        </div>

                        {/* Phone number */}
                        <div className="md-form mt-3">
                          <strong>Phone Number</strong>
                          <input defaultValue={this.state.missing_phone} onBlur={this.validate} required type="text" onChange={this.handleChangInputPhoneEditMissing} className="form-control" />
                          <p className="text-danger">{this.state.message["phone"]}</p>
                        </div>

                        <div className="form-group">
                          <strong className="col-form-label">Image Discription</strong>
                          {
                            this.state.missing_img ?
                              <div>
                                <p>
                                  <img src={this.state.missing_img} width="150px" height="100px" />
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
                        <button onClick={this.handleSubmit} className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Send</button>
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
            Edit Post Missing Report Successfull
          </Modal.Body>
          <Modal.Footer>
            <Link to="/missings" variant="secondary" >
              Close
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default EditMissingReportForm;