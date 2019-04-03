import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';


class AddCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <Sidebar />
        {/* From add category */}
        <div id="right-panel" className="right-panel">
          <div class="content">
            
          </div>
        </div>
      </div>
    );
  }
}
export default AddCategory;