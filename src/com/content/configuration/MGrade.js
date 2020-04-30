import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import df_grade from "../../../lib/class/data/df_grade";
import df_subject from "../../../lib/class/data/df_subject";
import m_class_section from "../../../lib/class/data/m_class_section";
import Call from "../../../lib/api/Call";
import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
} from "../../../lib/global/helpers";
const styles = (theme) => ({});

class Subject extends Component {
  constructor(props) {
    super(props);
    this.subjectSelect = [];
    this.subjects.map((row, i) => {
      this.subjectSelect.push({
        id: row.id,
        name: row.__section.grade + " - " + row.subject,
      });
    });
  }

  subjects = [
    new df_subject({
      id: "a2s1d2asd3546asd",
      subject: "Sinhala",
      class_section_id: "asdasde54332as",
      __section: new m_class_section({
        id: "a2s1d2asd3546asd",
        grade: "Grade 1",
        is_active: true,
      }),
      is_active: true,
    }),
  ];

  rows = [
    new df_grade({
      id: "a2s1d2asd3546asd",
      grade: "Grade A",
      class_section_id: "asdasde54332as",
      __subject: new df_subject({
        id: "a2s1d2asd3546asd",
        subject: "Sinhala",
        class_section_id: "asdasde54332as",
        __section: new m_class_section({
          id: "a2s1d2asd3546asd",
          grade: "Grade 1",
          is_active: true,
        }),
        is_active: true,
      }),
      is_active: true,
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
          Subjects
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              class subjects
            </Card.Subtitle>
            <Card.Text>
              All the usable sujects for the specified grades are listed below.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Subject
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="subject_id"
                    required="required"
                    type="text"
                    id="cmbSubject"
                    label="Select Subject"
                    smalltext="Select subject from desired section"
                    items={this.subjectSelect}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="min_marks"
                    required="required"
                    type="number"
                    id="txtMinMarks"
                    label="Minimum Marks"
                    placeholder="Marks"
                    smalltext="Enter minimimum marks to get the grade"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="max_marks"
                    required="required"
                    type="number"
                    id="txtMaxMarks"
                    label="Maximum Marks"
                    placeholder="Marks"
                    smalltext="Enter maximum marks to get the grade"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_active"
                id="chkIsActive"
                label="Activate the current subject"
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
                Save grade settings
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
              List of available grades already exists
            </Typography>
          </Col>
          <Col col="sm-12 lg-6" mt={4}>
            <Form.Group>
              <label htmlFor="chkSelectGrade">Select Grade</label>
              <Form.Select id="chkSelectGrade">
                {this.subjectSelect.map((item, i) => (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Form.Text text="muted" xs={12} md={6}>
                Select subject to load inherited grades
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {this.rows.map((row, i) => (
            <Col col="sm-12 md-6 lg-6 xl-4" key={i}>
              <Card mt={4} id={row.id}>
                <Card.Body>
                  <Card.Title>
                    <Grid style={{ float: "right" }}>
                      <EditOutlined fontSize="small" color="action" />
                      <DeleteOutline fontSize="small" color="error" />
                    </Grid>
                    {row.id}
                  </Card.Title>
                  <Card.Subtitle mb="2" text="muted">
                    {row.grade}
                  </Card.Subtitle>
                  <Card.Text mb="2" text="muted">
                    {row.__subject.subject} {" - "}
                    {row.__subject.__section.grade}
                  </Card.Text>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is grade active
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
  form: "SubjectForm",
})(withStyles(styles)(Subject));
