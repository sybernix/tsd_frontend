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

import df_teacher_grade from "../../../lib/class/data/df_teacher_grade";
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
    this.selectGrade = [];
    this.selectMaritial = [];

    this.selectQualification = [];
    this.selectSpeciality = [];
    this.selectInstitute = [];

    this.grades.map((row, i) => {
      this.selectGrade.push({ id: row.id, name: row.level });
    });

    this.status.map((row, i) => {
      this.selectMaritial.push({ id: row.id, name: row.status });
    });
  }

  onSubmit = (values) => {
    console.log(values);
    Call.Request("Subject", null, values)
      .then((response) => {})
      .catch(() => {});
  };

  grades = [
    new df_teacher_grade({
      id: "214as5d4as65d",
      level: "Grade 1",
      is_active: true,
    }),
    new df_teacher_grade({
      id: "214as5d4as65d",
      level: "Grade 2",
      is_active: true,
    }),
  ];

  status = [
    new df_marital_status({ id: "a2s1d2asd3546asd", status: "Married" }),
    new df_marital_status({ id: "524a6s5d46a1sdsa", status: "Widowed" }),
    new df_marital_status({ id: "524a6s5dsda1sd21", status: "Separated" }),
    new df_marital_status({ id: "524a6s5d46a1ssdf", status: "Divorced" }),
    new df_marital_status({ id: "524a6s5d46a1fsdd", status: "Single" }),
  ];

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Manage Teachers
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              teachers
            </Card.Subtitle>
            <Card.Text>
              All teachers, of the organization and their poersonal information
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
                    Registration
                  </Typography>
                </Col>
              </Row>

              <hr />
              <Row>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="reg_no"
                    type="text"
                    required="required"
                    id="txtRegno"
                    label="Registration Number"
                    placeholder="Registration Number"
                    smalltext="Enter the registration number of the teacher"
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
                    items={this.selectGrade}
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
                Save administrator settings
              </Button>
              <Button secondary type="reset" color="secondary" mt={2}>
                Clear changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Header>Teacher Qualifications</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="Institute_id"
                    id="cmbInstitute"
                    label="Institute"
                    items={this.selectInstitute}
                    component={renderSelect}
                  />
                </Col>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="ed_spacility_id"
                    id="cmbSpeciality"
                    label="Speciality"
                    items={this.selectSpeciality}
                    component={renderSelect}
                  />
                </Col>{" "}
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="ed_qualification_id"
                    id="cmbQualification"
                    label="Qualification"
                    items={this.selectSpeciality}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="reg_no"
                    type="text"
                    required="required"
                    id="txtRegno"
                    label="Registration Number"
                    placeholder="Registration Number"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="started_date"
                    type="date"
                    required="required"
                    id="txtStartedDate"
                    label="Started Date"
                    placeholder="Started Date"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 lg-4 xl-3">
                  <Field
                    name="finished_date"
                    type="date"
                    id="txtFinishedDate"
                    label="Finished Date"
                    placeholder="Finished Date"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12">
                  <Field
                    name="completed"
                    id="chkIsCompleted"
                    label="Completed"
                    component={renderCheckBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12">
                  <Button
                    disabled={submitting}
                    success
                    type="submit"
                    color="primary"
                    mr={2}
                    mt={2}
                  >
                    Save qualification
                  </Button>
                  <Button info type="reset" color="secondary" mt={2}>
                    Clear changes
                  </Button>
                </Col>
              </Row>
            </Form>
            <ListGroup mt={4}>
              <ListGroup.Item>
                <Badge success mr={2}>
                  Y
                </Badge>
                Moratuwa University - (BSc.) - Physical Science on 2006-2009
                <Box style={{ float: "right" }}>
                  <EditOutlined />
                  <DeleteOutline />
                </Box>
              </ListGroup.Item>
              <ListGroup.Item>
                <Badge warning mr={2}>
                  N
                </Badge>
                Peradeniya University - (MSc.) - Physical Science on 2009-2011
                <Box style={{ float: "right" }}>
                  <EditOutlined />
                  <DeleteOutline />
                </Box>
              </ListGroup.Item>
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
