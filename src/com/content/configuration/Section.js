import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import m_class_section from "../../../lib/class/data/m_class_section";
import Call from "../../../lib/api/Call";
import { renderTextBox, renderCheckBox } from "../../../lib/global/helpers";
const styles = (theme) => ({});

class Section extends Component {
  constructor(props) {
    super(props);
  }

  rows = [
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 1",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 2",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 3",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 4",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 5",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 6",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 7",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 8",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 9",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 10",
      is_active: true,
    }),
    new m_class_section({
      id: "a2s1d2asd3546asd",
      grade: "Grade 11",
      is_active: true,
    }),
  ];

  onSubmit = (values) => {
    console.log(values);
    Call.Request("Section", null, values)
      .then((response) => {})
      .catch(() => {});
  };

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Sections
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              class sections
            </Card.Subtitle>
            <Card.Text>
              The class sections of the organization are listed here.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Grade
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="grade"
                    required="required"
                    type="text"
                    id="txtSection"
                    label="Class Grade"
                    placeholder="Enter Class Grade"
                    smalltext="Enter the class grade of the school"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_active"
                id="chkIsActive"
                label="Activate the current grade"
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
                Save class grade settings
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
              List of available classes already exists
            </Typography>
          </Col>
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
  form: "SectionForm",
})(withStyles(styles)(Section));
