import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getHotlines, getHotlinesbyID, editHotline, addHotline, deleteHotline } from '../../../api/hotlineapi';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

class ManageHotline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hotlines: [],
      isShowHotline: true,
      shouldShowEdit: false,
      selectedID: '',
      selectedArea: '',
      selectedHotline: '',
      hotline_area: '',
      hotline_number: ''
    }
    this.handShowInputHotline = this.handShowInputHotline.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddHotline = this.handleAddHotline.bind(this);
  }

  componentDidMount() {
    if (this.state.hotlines.length === 0) {
      getHotlines().then(res => {
        this.setState({ hotlines: res.data })
      });
    }
  }

  handShowInputHotline() {
    this.setState({
      isShowHotline: !this.state.isShowHotline
    })
  }

  /* Modal show edit */

  handleShowEdit = (id) => {
    getHotlinesbyID(id).then(res => {
      this.setState({
        selectedID: id,
        selectedArea: res.data.area,
        selectedHotline: res.data.hotline_number,
        shouldShowEdit: true
      })
    }
    );
  }

  handleCloseEdit() {
    this.setState({
      shouldShowEdit: false
    })
  }

  handleChangInputEditArea = event => {
    this.setState({
      selectedArea: event.target.value
    })
  }

  handleChangInputEditHotline = event => {
    this.setState({
      selectedHotline: event.target.value
    })
  }

  handleEdit() {
    const hotline = {};
    if (this.state.selectedArea.length > 0 && this.state.selectedHotline > 0) {
      hotline['area'] = this.state.selectedArea
      hotline['hotline_number'] = this.state.selectedHotline
      editHotline(this.state.selectedID, hotline).then(res => {
        getHotlines().then(res => {
          this.setState({ hotlines: res.data })
        })
      })
    }
    this.handleCloseEdit();
  }

  handleChangInputAddArea = event => {
    this.setState({
      hotline_area: event.target.value
    })
  }

  handleChangInputAddHotline = event => {
    this.setState({
      hotline_number: event.target.value
    })
  }

  handleAddHotline() {
    const hotline = {};
    if (this.state.hotline_area.length > 0 && this.state.hotline_number.length > 0) {
      hotline['area'] = this.state.hotline_area
      hotline['hotline_number'] = this.state.hotline_number
      addHotline(hotline).then(res => {
        getHotlines().then(res => {
          this.setState({ hotlines: res.data })
        });
        this.setState({
          hotline_area: '',
          hotline_number: ''
        })
      })
    } else {
      alert("You have to text in input")
    }
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
                        <input value={this.state.hotline_area} onChange={this.handleChangInputAddArea} type="text" className="form-control" placeholder="Area" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <input value={this.state.hotline_number} onChange={this.handleChangInputAddHotline} type="text" className="form-control" placeholder="Hotline number" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <button onClick={this.handleAddHotline} className="btn btn-outline-secondary">Submit</button>
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
                                  <td> {getHotlines.area} </td>
                                  <td> {getHotlines.hotline_number} </td>
                                  <td>
                                    <button onClick={() => { this.handleShowEdit(getHotlines.id) }} className="ml-3 fa fa-edit"></button>
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

        {/* Modal show edit */}
        <Modal show={this.state.shouldShowEdit} onHide={this.handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit This Hotline</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">{this.state.selectedID}</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.selectedArea}
                onChange={this.handleChangInputEditArea}
              />
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={this.state.selectedHotline}
                onChange={this.handleChangInputEditHotline}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleEdit}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ManageHotline;