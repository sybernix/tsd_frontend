import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Index from "./com/Index";
import Login from "./com/login/Login";
import Forgot from "./com/login/Forgot";

const themeObject = {
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  palette: {
    type: "dark"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  /*
  componentDidMount() {
    this.checkCookie(null);
  }

  checkCookie(cookie) {
    if (!cookie) {
      console.log(this.props.Route);
      this.props.Route.push("/login");
    }
  }
*/
  render() {
    const themeConfig = createMuiTheme(themeObject);
    return (
      <MuiThemeProvider theme={themeConfig}>
        <CssBaseline />
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path="/*" component={Index}></Route>
              <Route exact path="/forgot" component={Forgot}></Route>
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  container: PropTypes.any
};

export default App;
