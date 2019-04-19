import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getCategories } from '../../../api/categoriesapi';
import { uploadImage } from '../../../api/imgurapi';
import { editCrimeReport, getCrimeReports } from '../../../api/crimesapi';
import ReactLoading from 'react-loading';
import { Modal, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'

class EditCrimeReportForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      crime_title: '',
      crime_category: '',
      crime_content: '',
      crime_area: '',
      crime_img: '',
      isLoading: false,
      message: {},
      shouldShowSuccess: false,
      crime: this.props.location.state.crimebyID,

    }
    this.validate = this.validate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.handleGetCategories()
    this.setState({
      crime_area: this.state.crime.area,
      crime_title: this.state.crime.title,
      crime_content: this.state.crime.description,
      crime_category: this.state.crime.category_id,
      crime_img: this.state.crime.image
    })
  }

  handleGetCategories() {
    getCategories().then(res => {
      this.setState({ categories: res.data })
    })
  }

  handleChangInputAreaEditCrime = event => {
    this.setState({
      crime_area: event.target.value
    })
  }

  handleChangInputTitleCrime = event => {
    this.setState({
      crime_title: event.target.value
    })
  }

  handleChangInputCateEditCrime = event => {
    this.setState({
      crime_category: event.target.value
    })
  }

  handleChangInputContentEditCrime = event => {
    this.setState({
      crime_content: event.target.value
    })
  }

  // uploadImage = (event) => {
  //   this.setState({
  //     isLoading: true
  //   })
  //   const imgFile = event.target.files[0];
  //   uploadImage(imgFile).then(response => {
  //     const imageUrl = response.data.data.link;
  //     this.setState({ crime_img: imageUrl, isLoading: false })
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  handleSubmit= (event) => {
    event.preventDefault();
    
    const crime = {};
    if (this.state.crime_title.length > 0 || this.state.crime_content.length > 0) {
      crime['title'] = this.state.crime_title
      crime['description'] = this.state.crime_content
      crime['category_id'] = this.state.crime_category
      crime['area'] = this.state.crime_area

      editCrimeReport(this.state.crime.id, crime)
    }
  }

  validate() {
    let message = {};
    if (this.state.crime_title.length < 5 || this.state.crime_title.length > 50) {
      message["title"] = "Title must be between 5 to 50 characters"
    } else if (this.state.crime_content.length <= 10) {
      message["description"] = "Description must better than 10"
    }
    this.setState({
      message: message
    })
  }


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
                    <strong className="card-title info-color white-text text-center py-4">Edit Crime Report</strong>
                  </div>

                  <div className="card">
                    {/*Card content*/}
                    <div className="card-body px-md-5">
                      {/* Form */}
                      <form className="text-center" style={{ color: '#757575' }} >
                        {/* Title */}
                        <div className="md-form mt-3">
                          <strong>Title</strong>
                          <input defaultValue={this.state.crime.title} onBlur={this.validate} required onChange={this.handleChangInputTitleCrime} type="text" className="form-control" />
                          <p className="text-danger">{this.state.message["title"]}</p>
                        </div>

                        {/* Area */}
                        <div className="row">
                          <div className="md-form mt-3 col-md-6">
                            <strong>Area</strong>
                            <select defaultValue={this.state.crime.area} className="form-control" onChange={this.handleChangInputAreaEditCrime}>
                              <option value="Hải Châu">Hải Châu</option>
                              <option value="Cẩm Lệ">Cẩm Lệ</option>
                              <option value="Liên Chiểu">Liên Chiểu</option>
                              <option value="Thanh Khê">Thanh Khê</option>
                              <option value="Sơn Trà">Sơn Trà</option>
                              <option value="Ngũ Hành Sơn">Ngũ Hành Sơn</option>
                            </select >
                          </div>

                          {/* Crime category */}
                          <div className="form-group mt-3 col-md-6">
                            <strong>Category</strong>
                            <select defaultValue={this.state.crime.category_id} className="form-control" onChange={this.handleChangInputCateEditCrime}>
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

                        {/*Decription*/}
                        <div className="form-group mt-3">
                          <strong>Description</strong>
                          <textarea defaultValue={this.state.crime.description} className="form-control" required onBlur={this.validate} onChange={this.handleChangInputContentEditCrime} />
                          <p className="text-danger">{this.state.message["description"]}</p>
                        </div>

                        {/*Image*/}
                        <div className="form-group">
                          <strong className="col-form-label">Image Discription</strong>
                          {
                            this.state.crime.image ?
                              <div>
                                <p>
                                  <img src={this.state.crime.image} width="150px" height="100px" />
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
                              <div>
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
                              </div>
                          }
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Edit</button>
                      </form>
                      {/* Form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditCrimeReportForm;