import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getMissingReport } from '../../../api/missingapi'

class ManageMissing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      missing: []
    }
  }

  componentDidMount() {
    if (this.state.missing.length === 0) {
      getMissingReport().then(res => {
        this.setState({ missing: res.data })
      })
    }
  }

  render() {
    const { missing } = this.state;
    return (
      <div>
        <Sidebar />
        {/* Missing person */}
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">Manage Missing Report</strong>
                      <button id="AddButton" className="btn btn-primary">Add Missing Report</button>
                    </div>
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th className="avatar">Avatar</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th>Phonenumber</th>
                            <th>Id User</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        {
                          missing.length > 0 && (
                            missing.map((getMissingReport, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getMissingReport.id} </td>
                                  <td>  </td>
                                  <td> {getMissingReport.title} </td>
                                  <td> {getMissingReport.description} </td>
                                  <td> {getMissingReport.created_at} </td>
                                  <td> {getMissingReport.phone_number} </td>
                                  <td> {getMissingReport.user_id} </td>
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
export default ManageMissing;