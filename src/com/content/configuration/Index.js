import React, { Component } from "react";
import { Route } from "react-router-dom";
import Organization from "./Organization";
import Section from "./Section";
import Classes from "./Classes";
import Subject from "./Subject";
import MGrade from "./MGrade";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route
          exact
          path="/configuration/organization"
          component={Organization}
        ></Route>
        <Route exact path="/configuration/section" component={Section}></Route>
        <Route exact path="/configuration/classes" component={Classes}></Route>
        <Route
          exact
          path="/configuration/marking-grades"
          component={MGrade}
        ></Route>
        <Route exact path="/configuration/subjects" component={Subject}></Route>
      </div>
    );
  }
}
