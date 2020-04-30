import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { Row, Col, Card, Button } from "bootstrap-4-react";

import m_organization from "../../../lib/class/data/m_organization";
import Call from "../../../lib/api/Call";
import { renderTextBox, renderCheckBox } from "../../../lib/global/helpers";

const styles = (theme) => ({});

class Index extends Component {
  constructor(props) {
    super(props);
  }

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
          Organization
        </Typography>

        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              organization information
            </Card.Subtitle>
            <Card.Text>
              basic details of the organization can be found here.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Organization
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="name"
                    required="required"
                    type="text"
                    id="txtOrgName"
                    label="Organization Name"
                    placeholder="Enter Organization Name"
                    smalltext="The name of your organization"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row mb={2}>
                <Col col="12">
                  <Typography component="h6" variant="h6" align="left">
                    Address
                  </Typography>
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="line1"
                    required="required"
                    type="text"
                    id="txtLine1"
                    label="Address Line 1"
                    placeholder="Enter Address Line 1"
                    smalltext="Street Address Line 1"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="line2"
                    required="required"
                    type="text"
                    id="txtLine2"
                    label="Address Line 2"
                    placeholder="Enter Address Line 2"
                    smalltext="Street Address Line 2"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="line3"
                    type="text"
                    id="txtLine3"
                    label="Address Line 3"
                    placeholder="Enter Address Line 3"
                    smalltext="Street Address Line 3"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="city"
                    required="required"
                    type="text"
                    id="txtCity"
                    label="City"
                    placeholder="Enter City"
                    smalltext="City name"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="postcode"
                    required="required"
                    type="text"
                    id="txtPostcode"
                    label="Postcode"
                    placeholder="Enter Postcode"
                    smalltext="Postcode value"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="12">
                  <Button
                    disabled={submitting}
                    primary
                    type="submit"
                    color="primary"
                    mr={2}
                    mt={2}
                  >
                    Save organization details
                  </Button>
                  <Button secondary type="reset" color="secondary" mt={2}>
                    Clear changes
                  </Button>
                </Col>
              </Row>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: "organizationForm",
})(withStyles(styles)(Index));
