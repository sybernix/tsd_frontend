import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { Field, reduxForm, FormSection } from "redux-form";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import Contact from "../__common/Contact";

import Call from "../../../lib/api/Call";
import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
  renderRadio,
} from "../../../lib/global/helpers";

const styles = (theme) => ({});

class Administrator extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (values) => {
    console.log(values);
    Call.Request("Subject", null, values)
      .then((response) => {})
      .catch(() => {});
  };

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Studetns
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              student accounts
            </Card.Subtitle>
            <Card.Text>
              The students are listed below, the users who have the student
              privileges.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Student
            </Card.Title>
            <hr />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row mb="2">
                <Col col="sm-12">
                  <Typography component="h6" variant="h6" align="left">
                    Identification
                  </Typography>
                </Col>
              </Row>

              <FormSection name="contact">
                <Contact type="admin" />
              </FormSection>

              <Row>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="reg_no"
                    type="text"
                    required="required"
                    id="txtRegno"
                    label="Registration Number"
                    placeholder="Registration Number"
                    smalltext="Enter the registration number of the student"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="reg_date"
                    type="date"
                    required="required"
                    id="txtRegistrationDate"
                    label="Registration Date"
                    placeholder="Registration Date"
                    smalltext="Enter date of registration"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="end_date"
                    type="date"
                    id="txtRegistrationEnd"
                    label="Registration End Date"
                    placeholder="Registration End Date"
                    smalltext="Enter date of registration ended"
                    component={renderTextBox}
                  />
                </Col>
              </Row>

              <Button
                disabled={submitting}
                primary
                type="submit"
                color="primary"
                mr={2}
                mt={2}
              >
                Save administrator settings
              </Button>
              <Button secondary type="reset" color="secondary" mt={2}>
                Clear changes
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: "AdministratorForm",
})(withStyles(styles)(Administrator));
