import React, { Component } from 'react';

import {withRouter} from'react-router-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Homepage from './Homepage';
import Login from './components/login/Login';
import ManageCate from './components/common/body/ManageCate';
import ManageCrime from './components/common/body/ManageCrime';
import ManageMissing from './components/common/body/ManageMissing';
import ManageUser from './components/common/body/ManageUser';
import ManageHotline from './components/common/body/ManageHotline';
import ManageComment from './components/common/body/ManageComment';

class App extends Component {
  render() {
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
      </Switch>
    );
  }
}

export default withRouter(App);
