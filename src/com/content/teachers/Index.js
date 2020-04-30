import React, { Component } from "react";
import { Route } from "react-router-dom";
import Grades from "./Grades";
import Institutes from "./Institutes";
import QualificationSpeciality from "./QualificationSpeciality";
import Qualification from "./Qualification";
import Manage from "./Manage";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route exact path="/teachers/grades" component={Grades}></Route>
        <Route exact path="/teachers/institutes" component={Institutes}></Route>
        <Route
          exact
          path="/teachers/speciality"
          component={QualificationSpeciality}
        ></Route>
        <Route
          exact
          path="/teachers/qualification"
          component={Qualification}
        ></Route>
        <Route exact path="/teachers/manage" component={Manage}></Route>
      </div>
    );
  }
}
