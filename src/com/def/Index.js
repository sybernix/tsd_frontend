import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccessLevel from "./AccessLevel";

export default class index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route path="/def/acccess" component={AccessLevel}></Route>
        <Route exact path="/*" component={AccessLevel} />
      </div>
    );
  }
}
