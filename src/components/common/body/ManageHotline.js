import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getHotlines } from '../../../api/hotlineapi';

class ManageHotline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hotlines: [],
      isShowHotline: true
    }
    this.handShowInputHotline = this.handShowInputHotline.bind(this);
  }

  componentDidMount() {
    if (this.state.hotlines.length === 0) {
      getHotlines().then(res => {
        this.setState({ hotlines: res.data })
        console.log(res.data)
      });
    }
  }

  handShowInputHotline() {
    this.setState({
      isShowHotline: !this.state.isShowHotline
    })
  }

  render() {
    const { hotlines } = this.state;
    let btnAdd = "";
    if (this.state.isShowHotline) {
      btnAdd = <button onClick={this.handShowInputHotline} id="AddButton" type="button" className="btn btn-primary">Add Hotline</button>
    } else {
      btnAdd = <button onClick={this.handShowInputHotline} id="AddButton" type="button" className="btn btn-warning">Cancle</button>
    }

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
                      <strong className="card-title">Manage Hotlines</strong>
                      {
                        btnAdd
                      }
                    </div>
                    {
                      !this.state.isShowHotline &&
                      <div className="input-group mb-3">
                        <input onChange={this.handleChangInputAddArea} type="text" className="form-control" placeholder="Area" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <input onChange={this.handleChangInputAddHotline} type="text" className="form-control" placeholder="Hotline number" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <button onClick={this.handleAddCate} className="btn btn-outline-secondary">Submit</button>
                        </div>
                      </div>
                    }
                    <div className="card-body">
                      <table id="bootstrap-data-table" className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Area</th>
                            <th>HotLine</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          hotlines.length > 0 && (
                            hotlines.map((getHotlines, index) => {
                              return <tbody key={index}>
                                <tr>
                                  <td> {getHotlines.id} </td>
                                  <td>{getHotlines.area}</td>
                                  <td>{getHotlines.hotline_number}</td>
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
export default ManageHotline;