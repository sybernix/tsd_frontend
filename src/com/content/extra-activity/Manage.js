import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import df_extra_activity_type from "../../../lib/class/data/df_extra_activity_type";
import df_extra_activity_position from "../../../lib/class/data/df_extra_activity_position";
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
    this.selectType = [];

    this.types.map((row, i) => {
      this.selectType.push({ id: row.id, name: row.type });
    });
  }

  types = [
    new df_extra_activity_type({
      id: "asdjasndq332",
      type: "Sports",
      is_active: true,
    }),
    new df_extra_activity_type({
      id: "asdjasnas332",
      type: "Association",
      is_active: true,
    }),
    ,
    new df_extra_activity_type({
      id: "asdjasnas332",
      type: "Literature",
      is_active: true,
    }),
  ];

  rows = [];

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
          Manage Extra Curriculum Activity
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              activity
            </Card.Subtitle>
            <Card.Text>
              All the extra curriculum activities are listed below.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Extra Curriculum Activity
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-8 lg-4">
                  <Field
                    name="extra_activity_type_id"
                    required="required"
                    type="text"
                    id="txtType"
                    label="Activity Type"
                    placeholder="Enter the Type"
                    smalltext="Enter the extra curriculum activity type"
                    items={this.selectType}
                    component={renderSelect}
                  />
                </Col>
                <Col col="sm-12 md-8 lg-4">
                  <Field
                    name="activity_name"
                    required="required"
                    type="text"
                    id="txtName"
                    label="Activity Name"
                    placeholder="Enter the Name"
                    smalltext="Enter the extra curriculum activity name"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-8 lg-4">
                  <Field
                    name="established_date"
                    required="required"
                    type="date"
                    id="txtDate"
                    label="Activity Established"
                    placeholder="Enter the Date"
                    smalltext="Enter the extra curriculum activity established date"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_active"
                id="chkIsActive"
                label="Activate extra activity type"
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
                Save type settings
              </Button>
              <Button secondary type="reset" color="secondary" mt={2}>
                Clear changes
              </Button>
            </form>
          </Card.Body>
        </Card>
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
                    {row.type}
                  </Card.Subtitle>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is type active
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
})(withStyles(styles)(Manage));
