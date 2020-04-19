import React, { Component } from "react";
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom'

class Logout extends Component {
  constructor(props) {
    super(props);
    Cookies.remove("infinity");
    Cookies.remove("usuario");
  }

  componentDidMount() {
    this.props.history.push("login");
  }  

  render() {
    return <div></div>;
  }
}

export default withRouter(Logout);
