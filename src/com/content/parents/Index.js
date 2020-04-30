import React, { Component } from "react";
import { Route } from "react-router-dom";

import Occupation from "./Occupation";
import OccupationCategory from "./OccupationCategory";
import Relations from "./Relations";
import Manage from "./Manage";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route exact path="/parents/occupations" component={Occupation}></Route>
        <Route
          exact
          path="/parents/occupation-category"
          component={OccupationCategory}
        ></Route>
        <Route exact path="/parents/relations" component={Relations}></Route>
        <Route exact path="/parents/manage" component={Manage}></Route>
      </div>
    );
  }
}
