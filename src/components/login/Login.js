import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="sufee-login d-flex align-content-center flex-wrap">
          <div className="container">
            <div className="login-content">
              <div className="login-logo">
                <a href="none">
                  <img className="align-content" src="https://www.no-gods-no-masters.com/images_designs/anonymous-d001008122317.png" width="480px" height="255px" alt="true" />
                </a>
              </div>
              <div className="login-form">
                <form>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" /> Remember Me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30">Sign in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);