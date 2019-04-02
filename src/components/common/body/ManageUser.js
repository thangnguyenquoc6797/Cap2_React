import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getUser } from '../../../api/userapi';

class ManageUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    if (this.state.users.length === 0) {
      getUser().then(res => {
        this.setState({ users: res.data })
      });
    }
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <Sidebar />
        {/* Manage User */}
        <div id="right-panel" className="right-panel">
          <div class="content">
            <div class="animated fadeIn">
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header">
                      <strong class="card-title">Manage User</strong>
                    </div>
                    <div class="card-body">
                      <table id="bootstrap-data-table" class="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Full name</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>ID card</th>
                            <th>Role</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          users.length > 0 && (
                            users.map((getUser, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getUser.id} </td>
                                  <td> {getUser.email} </td>
                                  <td> {getUser.fullname} </td>
                                  <td> {getUser.phone_number} </td>
                                  <td> {getUser.address} </td>
                                  <td> {getUser.id_card_number} </td>
                                  <td> #5469 </td>
                                  <td>
                                    <a href="none" class="ml-3 fa fa-trash"></a>
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
export default ManageUser;