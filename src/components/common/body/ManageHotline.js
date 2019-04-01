import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';

class ManageHotline extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div id="right-panel" className="right-panel">
          <div className="content">
            {/* Manage Hotline */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="box-title">Manage Hotline</h4>
                  </div>
                  <div className="card-body--">
                    <div className="table-stats order-table ov-h">
                      <table className="table ">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Area</th>
                            <th>HotLine</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> #5469 </td>
                            <td>Louis Sandey</td>
                            <td>070815067</td>
                          </tr>
                        </tbody>
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
export default ManageHotline;