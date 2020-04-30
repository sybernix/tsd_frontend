import React, { Component } from "react";
import { Route } from "react-router-dom";
import Student from "./Student";

export default class index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route path="/master/student" component={Student}></Route>
        <Route exact path="/master/*" component={Student}></Route>
      </div>
    );
  }
}

