import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { Edit, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import df_access_level from "../../../lib/class/data/df_access_level";
import Call from "../../../lib/api/Call";
import { renderTextBox, renderCheckBox } from "../../../lib/global/helpers";
const styles = (theme) => ({});

class AccessLevel extends Component {
  constructor(props) {
    super(props);
  }

  rows = [
    new df_access_level({
      id: "a2s1d2asd3546asd",
      level: "admin",
      is_admin: true,
      created_date: new Date(),
      is_active: true,
    }),
    new df_access_level({
      id: "524a6s5d46a1sd21",
      level: "teacher",
      is_admin: false,
      created_date: new Date(),
      is_active: true,
    }),
    new df_access_level({
      id: "324a68da323a2s4d",
      level: "parent",
      is_admin: false,
      created_date: new Date(),
      is_active: true,
    }),
    new df_access_level({
      id: "a56s4dasd121a23s",
      level: "student",
      is_admin: false,
      created_date: new Date(),
      is_active: true,
    }),
  ];

  onSubmit = (values) => {
    console.log(values);
    Call.Request("accesslevel", null, values)
      .then((response) => {})
      .catch(() => {});
  };

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Access Levels
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              access levels
            </Card.Subtitle>
            <Card.Text>
              The level provided here helopin the user to use the appliation
              with different authantications.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Levels
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="level"
                    required="required"
                    type="text"
                    id="txtAccessLevel"
                    label="Access Level"
                    placeholder="Enter Access Level"
                    smalltext="Don't change this unless you know what you are doing"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_admin"
                id="chkIsAdmin"
                label="This level users are administrators"
                component={renderCheckBox}
              />

              <Field
                name="is_active"
                id="chkIsActive"
                label="Activate the current level"
                component={renderCheckBox}
              />

              <Button
                disabled={submitting}
                primary
                type="submit"
                color="primary"
                mr={2}
                mt={2}
              >
                Save access level settings
              </Button>
              <Button secondary type="reset" color="secondary" mt={2}>
                Clear changes
              </Button>
            </form>
          </Card.Body>
        </Card>
        <Row>
          <Col col="sm-12" mt={4}>
            <Typography component="h2" variant="h6" align="left">
              List of available Levels
            </Typography>
          </Col>
          {this.rows.map((row, i) => (
            <Col col="sm-12 md-6 lg-6 xl-4" key={i}>
              <Card mt={4} id={row.id}>
                <Card.Body>
                  <Card.Title>
                    <Edit style={{ float: "right" }} />
                    {row.id}
                  </Card.Title>
                  <Card.Subtitle mb="2" text="muted">
                    {row.level}
                  </Card.Subtitle>
                  <Card.Text>
                    This account is currently has prvilages of the{" "}
                    {row.is_admin ? "Administrator" : "User"}
                  </Card.Text>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is level active
                    </Form.CustomCheckbox>
                  </Form.Group>
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
  enableReinitialize: true,
  form: "accessLevelForm",
})(withStyles(styles)(AccessLevel));
