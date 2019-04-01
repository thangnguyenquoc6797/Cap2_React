import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';

class ManageComment extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div id="right-panel" className="right-panel">
          <div className="content">
            {/* Manage Comment */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="box-title">Manage Comment</h4>
                  </div>
                  <div className="card-body--">
                    <div className="table-stats order-table ov-h">
                      <table className="table ">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>ID Post</th>
                            <th>Content</th>
                            <th>ID User</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> #5469 </td>
                            <td>321</td>
                            <td>Stupid</td>
                            <td>1</td>
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
export default ManageComment;