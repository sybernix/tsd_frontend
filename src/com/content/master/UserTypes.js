import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { Edit } from "@material-ui/icons";
import { Row, Col, Card, Button } from "bootstrap-4-react";

import df_user_type from "../../../lib/class/data/df_user_type";
import Call from "../../../lib/api/Call";
import { renderTextBox } from "../../../lib/global/helpers";

const styles = (theme) => ({});

class UserTypes extends Component {
  constructor(props) {
    super(props);
  }

  rows = [
    new df_user_type({ id: "a2s1d2asd3546asd", type_name: "admin" }),
    new df_user_type({ id: "524a6s5d46a1sdsa", type_name: "teacher" }),
    new df_user_type({ id: "524a6s5dsda1sd21", type_name: "parent" }),
    new df_user_type({ id: "524a6s5d46a1ssdf", type_name: "student" }),
  ];

  onSubmit = (values) => {
    console.log(values);
    Call.Request("maritialstatus", null, values)
      .then((response) => {})
      .catch(() => {});
  };

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          user types
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              User Types
            </Card.Subtitle>
            <Card.Text>
              These velues indicate user levels of the system. They are readonly
              and cannot be changed.
            </Card.Text>
          </Card.Body>
        </Card>

        <Row>
          <Col col="sm-12" mt={4}>
            <Typography component="h2" variant="h6" align="left">
              List of available User Types
            </Typography>
          </Col>

          {this.rows.map((row, i) => (
            <Col col="sm-12 md-6 lg-6 xl-4" key={i}>
              <Card mt={4} id={row.id}>
                <Card.Body>
                  <Card.Title>{row.id}</Card.Title>
                  <Card.Text mb="2" text="muted">
                    {row.type_name}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default reduxForm({
  form: "maritialStstusForm",
})(withStyles(styles)(UserTypes));
