import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../content/dashboard/Index";
import Master from "../content/master/Index";
import Configuration from "../content/configuration/Index";
import Administrators from "../content/administrators/Index";
import Teachers from "../content/teachers/Index";
import Parents from "../content/parents/Index";
import Students from "../content/students/Index";
import ExtraActivity from "../content/extra-activity/Index";

let drawerWidth = 250;
let appbarHeight = 60;

const styles = (theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      position: "relative",
      paddingTop: 20,
    },
    padding: 20,
    paddingTop: appbarHeight + 20,
    top: 0,
    left: "auto",
    right: 0,
  },
});

class Body extends Component {
  constructor(props) {
    super(props);
    drawerWidth = this.props.drawerWidth;
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.container}>
        <Router>
          <Switch>
            <Route exact path="/master/*" component={Master}></Route>
            <Route
              exact
              path="/configuration/*"
              component={Configuration}
            ></Route>
            <Route
              exact
              path="/administrators/"
              component={Administrators}
            ></Route>{" "}
            <Route exact path="/teachers/*" component={Teachers}></Route>
            <Route exact path="/parents/*" component={Parents}></Route>
            <Route exact path="/students/" component={Students}></Route>
            <Route
              exact
              path="/extra-activity/*"
              component={ExtraActivity}
            ></Route>
            <Route exact path="/*" component={Dashboard}></Route>
          </Switch>
        </Router>
      </Grid>
    );
  }
}

export default withStyles(styles)(Body);
