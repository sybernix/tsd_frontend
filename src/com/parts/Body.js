import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../dashboard/Dashboard";
import MasterIndex from "../master/Index";
import DefIndex from "../def/Index";

let drawerWidth = 250;
let appbarHeight = 60;

const styles = theme => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      position: "relative",
      paddingTop: 20
    },
    padding: 20,
    paddingTop: appbarHeight + 20,
    top: 0,
    left: "auto",
    right: 0
  }
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
            <Route exact path="/master/*" component={MasterIndex}></Route>
            <Route exact path="/def/*" component={DefIndex}></Route>
            <Route exact path="/*" component={Dashboard}></Route>
          </Switch>
        </Router>
      </Grid>
    );
  }
}

export default withStyles(styles)(Body);
