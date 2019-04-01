import React, { Component } from 'react';
import Header from './components/common/header/Header';
import Sidebar from './components/common/sidebar/Sidebar';
import Body from './components/common/body/Body';
import './App.css';

class Homepage extends Component {
  render() {
    return (  
      <div className="App">
        <div>
        <Header />

        <Sidebar />

        <Body />
        
        </div>
      </div>
    );
  }
}

export default Homepage;
