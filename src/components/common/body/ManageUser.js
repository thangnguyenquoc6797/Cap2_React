import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';

class ManageUser extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div id="right-panel" className="right-panel">
          <div className="content">
            {/* Manage User */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="box-title">Manage User</h4>
                  </div>
                  <div className="card-body--">
                    <div className="table-stats order-table ov-h">
                      <table className="table ">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>User name</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>ID card</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> #5469 </td>
                            <td>Louis Stanley</td>
                            <td> #5469 </td>
                            <td>Louis Stanley</td>
                            <td> #5469 </td>
                            <td>Louis Stanley</td>
                            <td> #5469 </td>
                            <td>Louis Stanley</td>
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
export default ManageUser;