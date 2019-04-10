import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getCategories } from '../../../api/categoriesapi';
import { uploadImage } from '../../../api/imgurapi';
import { addCrimeReport } from '../../../api/crimesapi';
import ReactLoading from 'react-loading';

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
      isLoading: false
    }
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
    crime_report["title"] = this.state.crime_title;
    crime_report["area"] = this.state.crime_area;
    crime_report["category_id"] = this.state.crime_category;
    crime_report["description"] = this.state.crime_content;
    crime_report["user_id"] = sessionStorage.getItem("user_id");
    addCrimeReport(crime_report).then(res => {
      alert(res.data["message"])
    })

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
    this.setState({
      crime_content: event.target.value
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
                          <input type="text" onChange={this.handleChangInputTitleAddCrime} className="form-control" />
                        </div>

                        {/* E-mail */}
                        <div className="row">
                          <div className="md-form mt-3 col-md-6">
                            <strong>Area</strong>
                            <select className="form-control" onChange={this.handleChangInputAreaAddCrime}>
                              <option defaultValue="1">Hải Châu</option>
                            </select>
                          </div>
                          {/* Subject */}

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
                          <strong>Discription</strong>
                          <textarea className="form-control" onChange={this.handleChangInputContentAddCrime} />
                        </div>

                        <div className="form-group">
                          <strong className="col-form-label">Image Discription</strong>
                          {
                            this.state.crime_img ?
                              <img src={this.state.crime_img} width="150px" height="100px" /> :
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
      </div>
    );
  }
}
export default CrimeReportForm;