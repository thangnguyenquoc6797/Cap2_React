import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        {/* Header*/}
        <header id="header" className="header">
          <div className="top-left">
            <div className="navbar-header">
              {/* &lt;<a className="navbar-brand"></a>&gt;
                &lt;%= image_tag "logo.png" %&gt;
                &lt;%= link_to "./", class: "navbar-brand hidden" do %&gt;
                &lt;%= image_tag "logo2.png" %&gt;
                &lt;% end %&gt;
                &lt;% end %&gt; */}
            </div>
          </div>
          <div className="top-right">
            <div className="header-menu">
              <div className="header-left">
              </div>
              <div className="user-area dropdown float-right">
                {/* &lt;%= link_to "#", class: "dropdown-toggle active",
                "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" do %&gt;
                &lt;%= image_tag "admin.jpg", class: "user-avatar rounded-circle" %&gt;
                &lt;% end %&gt; */}
              </div>
            </div>
          </div>
        </header>
        {/* /#header */}
      </div>
    );
  }
}
export default Header;