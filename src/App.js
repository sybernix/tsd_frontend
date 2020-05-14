import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { Notifications } from "react-push-notification";

import Index from "./com/Index";
import Login from "./com/login/Login";
import Forgot from "./com/login/Forgot";
import Logout from "./com/login/Logout";

import Variables from "./lib/global/Variables";
import Call from "./lib/api/Call";
import Authanitication from "./com/mod/Authanitication";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Notifications />
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/forgot" component={Forgot}></Route>
          <Authanitication>
            <Route exact path="/logout" component={Logout}></Route>
            <Route path="/*" component={Index}></Route>
          </Authanitication>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
