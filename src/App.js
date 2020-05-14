import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import Index from "./com/Index";
import Login from "./com/login/Login";
import Forgot from "./com/login/Forgot";
import Logout from "./com/login/Logout";

import Variables from "./lib/global/Variables";
import Call from "./lib/api/Call";
import Authanitication from "./com/mod/Authanitication";
import { messaging } from "./lib/mod/firebase/firebase";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log(token);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });

    navigator.serviceWorker.addEventListener("message", (message) => {
      console.log(message);
      addNotification({
        title: message.data["firebase-messaging-msg-data"].notification.title,
        //subtitle: message.data["firebase-messaging-msg-data"].priority,
        message: message.data["firebase-messaging-msg-data"].notification.body,
        theme: "darkblue",
        native: true, // when using native, your OS will handle theming.
      });
    });

    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
    });
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
