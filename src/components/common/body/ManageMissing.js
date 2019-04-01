import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';

class ManageMissing extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        {/* Missing person */}
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="box-title">Missing Person </h4>
                  </div>
                  <div className="card-body--">
                    <div className="table-stats order-table ov-h">
                      <table className="table ">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th className="avatar">Avatar</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th>Phonenumber</th>
                            <th>Id User</th>
                            <th className="text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> #5469 </td>
                            <td className="avatar">
                              <div className="round-img">
                                {/* &lt;%= link_to "#" do %&gt;
                                    &lt;%= image_tag "avatar/1.jpg", class: "rounded-circle" %&gt;
                                    &lt;% end %&gt; */}
                              </div>
                            </td>
                            <td>  <span className="name">Louis Stanley</span> </td>
                            <td> <span className="product">iMax</span> </td>
                            <td><span className="count">231</span></td>
                            <td><span className="count">231</span></td>
                            <td><span className="count">231</span></td>
                            <td>
                              <span className="badge badge-complete">Complete</span>
                            </td>
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
export default ManageMissing;