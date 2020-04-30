import React, { Component } from "react";
import { Route } from "react-router-dom";
import AccessLevel from "./AccessLevel";
import MaritialStatus from "./MaritialStatus";
import Titles from "./Titles";
import UserTypes from "./UserTypes";

export default class index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route exact path="/master/access-levels" component={AccessLevel}></Route>
        <Route exact path="/master/maritial-status" component={MaritialStatus}></Route>
        <Route exact path="/master/titles" component={Titles}></Route>
        <Route exact path="/master/user-types" component={UserTypes}></Route>
      </div>
    );
  }
}
