import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getCrimeComments } from '../../../api/commentCrimeApi';

class ManageCrimeComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      crime_comments: []
    }
  }

  componentDidMount() {
    if (this.state.crime_comments.length === 0) {
      getCrimeComments().then(res => {
        this.setState({ crime_comments: res.data })
      })
    }
  }

  render() {
    const { crime_comments } = this.state;
    return (
      <div>
        <Sidebar />
        {/* Manage Crime Comments */}
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">Manage Crime Report</strong>
                    </div>
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Content</th>
                            <th>ID User</th>
                            <th>ID Crime</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          crime_comments.length > 0 && (
                            crime_comments.map((getCrimeComments, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getCrimeComments.id} </td>
                                  <td> {getCrimeComments.content} </td>
                                  <td> {getCrimeComments.user_id} </td>
                                  <td> {getCrimeComments.crime_id} </td>
                                  <td>
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
export default ManageCrimeComments;