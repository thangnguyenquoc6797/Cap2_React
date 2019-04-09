import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getRoles } from '../../../api/rolesapi';

class ManageRole extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roles: []
    }
  }

  componentDidMount() {
    if (this.state.roles.length === 0) {
      getRoles().then(res => {
        this.setState({ roles: res.data })
      })
    }
  }

  render() {
    const { roles } = this.state;
    return (
      <div>
        <Sidebar />
        <div id="right-panel" className="right-panel">
          <div className="content">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong className="card-title">Manage Role</strong>
                      <button id="AddButton" className="btn btn-primary">Add Role</button>
                    </div>
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Role</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          roles.length > 0 && (
                            roles.map((getRoles, index) => {
                              return <tbody key={index} >
                                <tr>
                                  <td> {getRoles.id} </td>
                                  <td> {getRoles.role_name} </td>
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
export default ManageRole;