import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getReportByPost } from '../../../api/reportapi'

class ShowReportCrime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: [],
      crime: this.props.location.state.crimebyID,
    }
  }

  componentDidMount() {
    getReportByPost(this.state.crime.id).then(res => {
      this.setState({ report: res.data })
    })
  }

  render() {
    const { report } = this.state;
    return (
      <div>
        <Sidebar />
        {/* Manage Report */}
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">Report Post</strong>
                    </div>
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>Report Content</th>
                          </tr>
                        </thead>
                        {
                          report.length > 0 && (
                            report.map((getReportByPost, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getReportByPost.reportcategory} </td>
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
export default ShowReportCrime;