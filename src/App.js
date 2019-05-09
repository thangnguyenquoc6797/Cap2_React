import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Homepage from './Homepage';
import Login from './components/login/Login';
import ManageCate from './components/common/body/ManageCate';
import ManageCrime from './components/common/body/ManageCrime';
import ManageMissing from './components/common/body/ManageMissing';
import ManageUser from './components/common/body/ManageUser';
import ManageHotline from './components/common/body/ManageHotline';
import ManageComment from './components/common/body/ManageComment';
import ManageRole from './components/common/body/ManageRole';
import CrimeReportForm from './components/common/body/CrimeReportForm';
import MissingReportForm from './components/common/body/MissingReportForm';
import EditCrimeReportForm from './components/common/body/EditCrimeReportForm';
import EditMissingReportForm from './components/common/body/EditMissingReportForm';
import ManageComplaint from './components/common/body/ManageComplaint';
import ManageComplaintCate from './components/common/body/ManageComplaintCate';
import ComplaintReportForm from './components/common/body/ComplaintReportForm';
import Profile from './components/common/body/ManageMissingComplaint';

class App extends Component {

  getRoute() {
    const user_id = sessionStorage.getItem('user_id');
    if (user_id) {
      return (
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/homepage" component={Homepage} />
          <Route path="/categories" component={ManageCate} />
          <Route path="/crimes" component={ManageCrime} />
          <Route path="/missings" component={ManageMissing} />
          <Route path="/users" component={ManageUser} />
          <Route path="/hotlines" component={ManageHotline} />
          <Route path="/comments" component={ManageComment} />
          <Route path="/roles" component={ManageRole} />
          <Route path="/report-form" component={CrimeReportForm}/>
          <Route path="/missing-form" component={MissingReportForm} />
          <Route path="/edit-crime/:crime_id" component={EditCrimeReportForm} />
          <Route path="/edit-missing/:missing_id" component={EditMissingReportForm} />
          <Route path="/complaints" component={ManageComplaint} />
          <Route path="/complaint-form" component={ComplaintReportForm} />
          <Route path="/complaintcategorys" component={ManageComplaintCate} />
          <Route path="/profile" component={Profile} />
        </Switch>
      )
    }else {
      return <Redirect to='/'/>
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={Login} exact />
        {this.getRoute()}
      </Switch>
    );
  }
}

export default withRouter(App);
