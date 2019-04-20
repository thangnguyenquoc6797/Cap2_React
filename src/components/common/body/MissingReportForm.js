import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { uploadImage } from '../../../api/imgurapi';
import { addMissingReport } from '../../../api/missingapi';
import ReactLoading from 'react-loading';
import { Modal, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'

class MissingReportForm extends Component {
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
      shouldShowSuccess: false
    }
    this.validate = this.validate.bind(this)
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

  /* Add missing*/
  handleChangInputTitleAddMissing = event => {
    this.setState({
      missing_title: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const missing_report = {};
    this.validate();
    if (this.state.message.length > 0) {
      alert("Fail")
    } else {
      missing_report["title"] = this.state.missing_title;
      missing_report["description"] = this.state.missing_content;
      missing_report["phone_number"] = this.state.missing_phone;
      missing_report["image"] = this.state.missing_img;
      missing_report["user_id"] = sessionStorage.getItem("user_id");
      addMissingReport(missing_report).then(res => {
        this.setState({
          shouldShowSuccess: true
        })
      })
    }
  }


  handleChangInputContentAddMissing = event => {
    let message = {};
    message["description"] = '';
    this.setState({
      missing_content: event.target.value,
      message: message
    })
  }

  handleChangInputPhoneAddMissing = event => {
    this.setState({
      missing_phone: event.target.value
    })
  }

  /* CLOSE Add missing*/

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
                      <form className="text-center" style={{ color: '#757575' }} onSubmit={this.handleSubmit} >
                        {/* Title */}
                        <div className="md-form mt-3">
                          <strong>Title</strong>
                          <input onBlur={this.validate} required type="text" onChange={this.handleChangInputTitleAddMissing} className="form-control" />
                          <p className="text-danger">{this.state.message["title"]}</p>
                        </div>

                        {/*Discription*/}
                        <div className="form-group mt-3">
                          <strong>Description</strong>
                          <textarea className="form-control" required onBlur={this.validate} onChange={this.handleChangInputContentAddMissing} />
                          <p className="text-danger">{this.state.message["description"]}</p>
                        </div>

                        {/* Phone number */}
                        <div className="md-form mt-3">
                          <strong>Phone Number</strong>
                          <input onBlur={this.validate} required type="text" onChange={this.handleChangInputPhoneAddMissing} className="form-control" />
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
            Add Missing Person Report Successfull
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
export default MissingReportForm;