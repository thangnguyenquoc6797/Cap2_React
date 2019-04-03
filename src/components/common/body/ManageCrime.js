import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import {getCrimeReports} from '../../../api/crimesapi';

class ManageCrime extends Component {
  constructor(props){
    super(props)
    this.state = {
      crimes: []
    }
  }

  componentDidMount(){
    if (this.state.crimes.length === 0) {
      getCrimeReports().then(res => {
        this.setState({ crimes: res.data })
        console.log(res.data)
      })
    }
  }

  render() {
    const {crimes} = this.state;
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
                      <strong className="card-title">Manage Crime Report</strong>
                      <button id="AddButton" type="button" className="btn btn-primary">Add Crime Report</button>
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
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          crimes.length > 0 && (
                            crimes.map((getCrimeReports, index) => {
                              return <tbody key={index}>
                              <tr>
                                <td> {getCrimeReports.id} </td>
                                <td>  </td>
                                <td> {getCrimeReports.area} </td>
                                <td> {getCrimeReports.title} </td>
                                <td> {getCrimeReports.description} </td>
                                <td> ádasdasd </td>
                                <td> ádasdasd </td>
                                <td> ádasdasd </td>
                                <td>
                                  <button className="ml-3 fa fa-edit"></button>
                                  <button className="ml-3 fa fa-trash"></button>
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
      </div>
    );
  }
}
export default ManageCrime;