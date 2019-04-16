import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getCategories } from '../../../api/categoriesapi';
import { uploadImage } from '../../../api/imgurapi';
import { addCrimeReport } from '../../../api/crimesapi';
import ReactLoading from 'react-loading';
import { Modal, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'

class CrimeReportForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      crime_title: '',
      crime_category: '',
      crime_content: '',
      crime_area: 'Hải Châu',
      crime_img: '',
      isLoading: false,
      message: {},
      shouldShowSuccess: false,
    }
    this.validate = this.validate.bind(this)
  }

  handleGetCategories() {
    getCategories().then(res => {
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
      this.setState({ crime_img: imageUrl, isLoading: false })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.handleGetCategories();
  }

  validate() {
    let message = {};
    if (this.state.crime_title.length <=5 || this.state.crime_title.length >=50) {
      message["title"] = "Title must better than 5 and less than 50"
    } else if (this.state.crime_content.length <= 10) {
      message["description"] = "Description must better than 10"
    }
    this.setState({
      message: message
    })
  }

  /* Add crime*/
  handleChangInputTitleAddCrime = event => {
    this.setState({
      crime_title: event.target.value
    })
  }

  handleChangInputAreaAddCrime = event => {
    this.setState({
      crime_area: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const crime_report = {};
    this.validate();
    if (!this.state.crime_category) {
      this.setState({
        crime_category: this.state.categories[0].id
      })
    }else if(this.state.message.length > 0){
      alert("Fail")
    }
    else {
      crime_report["title"] = this.state.crime_title;
      crime_report["area"] = this.state.crime_area;
      crime_report["category_id"] = this.state.crime_category;
      crime_report["description"] = this.state.crime_content;
      crime_report["image"] = this.state.crime_img;
      crime_report["user_id"] = sessionStorage.getItem("user_id");
      addCrimeReport(crime_report).then(res => {
        this.setState({
          shouldShowSuccess: true
        })
      })
    }
  }

  handleChangInputCateAddCrime = event => {
    this.setState({
      crime_category: event.target.value
    })
  }

  handleChangInputAreaAddCrime = event => {
    this.setState({
      crime_area: event.target.value
    })
  }

  handleChangInputContentAddCrime = event => {
    let message = {};
    message["description"] = '';
    this.setState({
      crime_content: event.target.value,
      message: message
    })
  }

  /* CLOSE Add crime*/

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
                    <strong className="card-title info-color white-text text-center py-4">Add Crime Report</strong>
                  </div>

                  <div className="card">
                    {/*Card content*/}
                    <div className="card-body px-md-5">
                      {/* Form */}
                      <form className="text-center" style={{ color: '#757575' }} onSubmit={this.handleSubmit} >
                        {/* Name */}
                        <div className="md-form mt-3">
                          <strong>Title</strong>
                          <input onBlur={this.validate} required type="text" onChange={this.handleChangInputTitleAddCrime} className="form-control" />
                          <p className="text-danger">{this.state.message["title"]}</p>
                        </div>

                        {/* Area */}
                        <div className="row">
                          <div className="md-form mt-3 col-md-6">
                            <strong>Area</strong>
                            <select className="form-control" onChange={this.handleChangInputAreaAddCrime}>
                              <option value="Hải Châu">Hải Châu</option>
                              <option value="Cẩm Lệ">Cẩm Lệ</option>
                              <option value="Liên Chiểu">Liên Chiểu</option>
                              <option value="Thanh Khê">Thanh Khê</option>
                              <option value="Sơn Trà">Sơn Trà</option>
                              <option value="Ngũ Hành Sơn">Ngũ Hành Sơn</option>
                            </select>
                          </div>

                          {/* Crime category */}
                          <div className="form-group mt-3 col-md-6">
                            <strong>Category</strong>
                            <select className="form-control" onChange={this.handleChangInputCateAddCrime}>
                              {
                                categories.length > 0 && (
                                  categories.map((category, index) => {
                                    return (<option key={index} value={category.id}>{category.name_category}</option>)
                                  })
                                )
                              }
                            </select>
                          </div>
                        </div>

                        {/*Message*/}
                        <div className="form-group mt-3">
                          <strong>Description</strong>
                          <textarea className="form-control" required onBlur={this.validate} onChange={this.handleChangInputContentAddCrime} />
                          <p className="text-danger">{this.state.message["description"]}</p>
                        </div>

                        {/*Image*/}
                        <div className="form-group">
                          <strong className="col-form-label">Image Discription</strong>
                          {
                            this.state.crime_img ?
                              <p>
                                <img src={this.state.crime_img} width="150px" height="100px" />
                              </p> :
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
            Post Crime Report Successfull
          </Modal.Body>
          <Modal.Footer>
            <Link to="/crimes" variant="secondary" >
              Close
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default CrimeReportForm;