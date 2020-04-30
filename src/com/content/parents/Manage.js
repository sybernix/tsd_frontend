import React, { Component } from "react";
import { Typography, Box } from "@material-ui/core";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm, FormSection } from "redux-form";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Badge,
} from "bootstrap-4-react";

import Contact from "../__common/Contact";

import df_occupation from "../../../lib/class/data/df_occupation";
import df_occupation_category from "../../../lib/class/data/df_occupation_category";
import df_marital_status from "../../../lib/class/data/df_marital_status";
import Call from "../../../lib/api/Call";
import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
} from "../../../lib/global/helpers";

const styles = (theme) => ({});

class Manage extends Component {
  constructor(props) {
    super(props);
    this.selectOccupation = [];
    this.selectMaritial = [];

    this.occupation.map((row, i) => {
      this.selectOccupation.push({ id: row.id, name: row.occupation });
    });

    this.status.map((row, i) => {
      this.selectMaritial.push({ id: row.id, name: row.status });
    });
  }

  status = [
    new df_marital_status({ id: "a2s1d2asd3546asd", status: "Married" }),
    new df_marital_status({ id: "524a6s5d46a1sdsa", status: "Widowed" }),
    new df_marital_status({ id: "524a6s5dsda1sd21", status: "Separated" }),
    new df_marital_status({ id: "524a6s5d46a1ssdf", status: "Divorced" }),
    new df_marital_status({ id: "524a6s5d46a1fsdd", status: "Single" }),
  ];

  occupation = [
    new df_occupation({
      id: "214as5d4as65d",
      occupation_category_id: "3546asd6a8sdas",
      occupation: "Engineer",
      is_active: true,
      __category: new df_occupation_category({
        id: "asd23as7daadssd2",
        category: "Medical",
      }),
    }),
    new df_occupation({
      id: "214as5d4as65d",
      occupation_category_id: "doahasldlaosida",
      occupation: "Doctor",
      is_active: true,
      __category: new df_occupation_category({
        id: "asd23as7daadssd2",
        category: "Medical",
      }),
    }),
  ];

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
          Manage Parents
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              Parents
            </Card.Subtitle>
            <Card.Text>
              All parents, of the organization and their poersonal information
              are listed here.
            </Card.Text>
            <hr />
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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

              <Row mb="2">
                <Col col="sm-12">
                  <Typography component="h6" variant="h6" align="left">
                    Information
                  </Typography>
                </Col>
              </Row>
              <hr />
              <Row mb="2">
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="teacher_grade_id"
                    id="cmbTeacherGrade"
                    label="Select Grade"
                    smalltext="Select grade of the teacher"
                    items={this.selectOccupation}
                    component={renderSelect}
                  />
                </Col>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="marital_status_id"
                    id="cmbMaritialStatus"
                    label="Select Maritial Status"
                    smalltext="Select status of the teacher"
                    items={this.selectMaritial}
                    component={renderSelect}
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
                Save parent settings
              </Button>
              <Button secondary type="reset" color="secondary" mt={2}>
                Clear changes
              </Button>
            </Form>

            <Row mb={2} mt={4}>
              <Col col="sm-12">
                <Typography component="h6" variant="h6" align="left">
                  Students
                </Typography>
              </Col>
            </Row>
            <ListGroup mt={4}>
              <ListGroup.Item>Amila Tharanga</ListGroup.Item>
              <ListGroup.Item>Thissa Gunarathne</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: "ManageForm",
})(withStyles(styles)(Manage));
