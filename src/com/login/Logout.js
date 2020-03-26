import React, { Component } from "react";

class Logout extends Component {
  constructor(props) {
    super(this.props);
  }
  render() {
    props.history.push("/login");
    return <div></div>;
  }
}

export default Logout;
