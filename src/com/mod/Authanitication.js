import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";

import { getJWT, decrypt } from "./../../lib/global/helpers";
import Call from "../../lib/api/Call";
import Variables from "../../lib/global/Variables";
import { loginRequest } from "./../../lib/api/LoginApi";

const styles = () => ({
  page: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class Authanitication extends Component {
  state = {
    token: undefined,
    userID: undefined,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const jwt = getJWT();
    if (jwt.token == null || jwt.userLevel == null) {
      this.clearTokens();
    } else {
      let userLevel = decrypt(jwt.userLevel);
      window.USER_PATH = userLevel;
      loginRequest("verifyToken", jwt.token, {})
        .then((response) => {
          this.setState({ userID: response.data.user_id });
          Variables.UserLevel = response.data.userType;
          Variables.UserID = response.data.id;
        })
        .catch((error) => {
          console.log(error);
          //this.clearTokens();
        });
    }
  }

  clearTokens = () => {
    Cookies.remove("infinity");
    Cookies.remove("usuario");
    Cookies.remove("embose");
    this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;
    if (this.state.userID === undefined) {
      return (
        <div className={classes.page}>
          <CircularProgress />
        </div>
      );
    }

    return <div>{this.props.children}</div>;
  }
}

export default withRouter(withStyles(styles)(Authanitication));
