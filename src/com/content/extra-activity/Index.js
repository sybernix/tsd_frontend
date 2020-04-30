import React, { Component } from "react";
import { Route } from "react-router-dom";

import Manage from "./Manage";
import Position from "./Position";
import Students from "./Students";
import Type from "./Type";

export default class index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route exact path="/extra-activity/manage" component={Manage}></Route>
        <Route
          exact
          path="/extra-activity/position"
          component={Position}
        ></Route>
        <Route
          exact
          path="/extra-activity/students"
          component={Students}
        ></Route>
        <Route exact path="/extra-activity/type" component={Type}></Route>
      </div>
    );
  }
}
