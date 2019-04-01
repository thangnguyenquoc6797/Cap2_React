import React, { Component } from 'react';
import ManageCrime from './ManageCrime';
import ManageMissing from './ManageMissing';

class Body extends Component {
  render() {
    return (
      <div>
        {/* Right Panel */}
        {this.props.children}
        {/* Missing person */}
        <ManageMissing />

        {/* Manage Crime */}
        <ManageCrime />
      </div>
    );
  }
}
export default Body;