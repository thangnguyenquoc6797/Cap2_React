import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { user } from '../../../api/userapi';

class ManageUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    if (this.state.users.length === 0) {
      user().then(res => {
        console.log(res.data)
        this.setState({ users: res.data })
      });
    }
  }

  render() {
    const { users } = this.state;
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
                            <th>Email</th>
                            <th>Full name</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>ID card</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        {
                          users.length > 0 && (
                            users.map((user, index) => {
                              return <tbody key = {index}>
                                <tr>
                                  <td> {user.id} </td>
                                  <td> {user.email} </td>
                                  <td> {user.fullname} </td>
                                  <td> {user.phone_number} </td>
                                  <td> {user.address} </td>
                                  <td> {user.id_card_number} </td>
                                  <td> #5469 </td>
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
export default ManageUser;