import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

class Sidebar extends Component {

  handleLogout(){
    sessionStorage.removeItem('user_id');
  }

  render() {
    return (
      <div>
        {/* Left Panel */}
        <aside id="left-panel" className="left-panel">
          <nav className="navbar navbar-expand-sm navbar-default">
            <div id="main-menu" className="main-menu collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="active">
                  <h3>
                    <Link to="/homepage">DASHBOARD</Link>
                  </h3>
                </li>
                <li className="menu-item-has-children dropdown">
                  <a href="none" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-cogs" />Elements</a>
                  <ul className="sub-menu children dropdown-menu">
                    <li><i className="fa fa-puzzle-piece" />
                      <Link to="/categories">Crime Category</Link>
                    </li>
                    <li><i className="fa fa-puzzle-piece" />
                      <Link to="/crimes">Crime Report</Link>
                    </li>
                    <li><i className="fa fa-id-badge" />
                      <Link to="/missings">Missing Report</Link>
                    </li>
                    {/* <li><i className="fa fa-puzzle-piece" />
                      <Link to="/complaintcategorys">Complaint Category</Link>
                    </li>
                    <li><i className="fa fa-id-badge" />
                      <Link to="/complaints">Complaint Report</Link>
                    </li> */}
                    <li><i className="fa fa-user" />
                      <Link to="/users">User</Link>
                    </li>
                    <li><i className="fa fa-phone" />
                      <Link to="/hotlines">Hotline</Link>
                    </li>
                    <li><i className="fa fa-comments" />
                      <Link to="/comment-crimes">Comment Crimes</Link>
                    </li>
                    <li><i className="fa fa-comments" />
                      <Link to="/roles">Role</Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-title">Account</li>{/* /.menu-title */}
                <li className="menu-item-has-children dropdown">
                  <a href="none" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-google-plus" />Account</a>
                  <ul className="sub-menu children dropdown-menu">
                    <li><i className="menu-icon fa fa-user-md" />
                      <Link to="/profile">User Information</Link>
                    </li>
                    <li><i className="menu-icon fa fa-paper-plane" />
                      <Link onClick={this.handleLogout} to="/">Logout</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
      </div>
    );
  }
}
export default withRouter(Sidebar);