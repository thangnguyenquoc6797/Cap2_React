import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { login } from '../../api/userapi'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    const { email, password } = this.state;
    login({
      "email": `${this.state.email}`,
      "password": `${this.state.password}`
    }).then(res => {
      if (res.data.message) {
        return < Redirect to= '/homepage' />
      } else {
        console.log("not");
      }
    }).catch(err => {

    })
  }

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
                    <input onChange={this.handleChangeEmail} type="email" className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input onChange={this.handleChangePassword} type="password" className="form-control" placeholder="Password" />
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" /> Remember Me
                    </label>
                  </div>
                  <button onClick={this.handleSubmit} type="submit" className="btn btn-success btn-flat m-b-30 m-t-30">Sign in</button>
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