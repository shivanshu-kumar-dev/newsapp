import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import NewsCategory from "./components/NewsCategory";
import {BrowserRouter } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <NewsCategory/>
        </div>
      </BrowserRouter>
    );
  }
}