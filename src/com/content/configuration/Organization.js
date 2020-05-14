import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Row, Col, Card, Button } from "bootstrap-4-react";

import { renderTextBox, renderHidden } from "../../../lib/global/helpers";
import m_organization from "../../../lib/class/data/m_organization";
import { organizationRequest } from "../../../lib/api/m/OrganizationApi";

const styles = (theme) => ({});
const formName = "organizationForm";

class Index extends Component {
  constructor(props) {
    super(props);
  }

  loadData() {
    organizationRequest("retrieve")
      .then((response) => {
        let val = response.data.length > 0 ? response.data[0] : null;
        var org = new m_organization(val);
        this.props.dispatch(initialize(formName, org));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  onSubmit = (values, dispatch) => {
    console.log(values);
    let path = values._id !== "" ? "update" : "add";
    organizationRequest(path, values)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
        dispatch(reset(formName));
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes, handleSubmit, submitting, reset } = this.props;
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
              <Field
                name="_id"
                id="txtID"
                type="hidden"
                component={renderHidden}
              />
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
                  <Button
                    secondary
                    type="reset"
                    color="secondary"
                    mt={2}
                    onClick={reset}
                  >
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
  keepDirtyOnReinitialize: true,
  form: formName,
})(withStyles(styles)(Index));
