import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Field, reduxForm } from "redux-form";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import Call from "../../../lib/api/Call";
import df_ed_qualification from "../../../lib/class/data/df_ed_qualification";
import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
} from "../../../lib/global/helpers";

const styles = (theme) => ({});

class Qualification extends Component {
  constructor(props) {
    super(props);
  }

  rows = [
    new df_ed_qualification({
      id: "214as5d4as65d",
      qualification: "Certificate",
      sort_order: 0,
      is_active: true,
    }),
    new df_ed_qualification({
      id: "214as5d4as65d",
      qualification: "Diploma",
      sort_order: 1,
      is_active: true,
    }),
    new df_ed_qualification({
      id: "214as5d4as65d",
      name: "Higher Diploma",
      sort_order: 2,
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
          Qualifications
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              teachers qualifications
            </Card.Subtitle>
            <Card.Text>
              Manage the qualifications assign to the teachers.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Qualification
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="qualification"
                    required="required"
                    type="text"
                    id="txtQualification"
                    label="Qualification"
                    placeholder="Enter the Qualification"
                    smalltext="Enter the qualification short name (ex: BSc)"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="sort_order"
                    required="required"
                    type="number"
                    id="txtSortOrder"
                    label="Sort Order"
                    placeholder="Sorting order"
                    smalltext="Enter the sorting order for the qualification"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_active"
                id="chkIsActive"
                label="Activate current institute"
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
                Save institute settings
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
              List of available institutes
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
                    {row.qualification}
                  </Card.Subtitle>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is institute active
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
  form: "QualificationForm",
})(withStyles(styles)(Qualification));
