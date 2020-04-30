import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Field, reduxForm } from "redux-form";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import df_relation_type from "../../../lib/class/data/df_relation_type";
import Call from "../../../lib/api/Call";
import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
} from "../../../lib/global/helpers";

const styles = (theme) => ({});

class Grades extends Component {
  constructor(props) {
    super(props);
  }

  rows = [
    new df_relation_type({
      id: "asd23as7daasd2",
      relation: "Father",
      is_parent: true,
      is_active: true,
    }),
    new df_relation_type({
      id: "asd23as7daadssd2",
      relation: "Mother",
      is_parent: true,
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
          Relationship
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              parent occupations
            </Card.Subtitle>
            <Card.Text>Manage the occupations of the parents.</Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Relationship
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="relation"
                    required="required"
                    type="text"
                    id="txtRelation"
                    label="Relationship Name"
                    placeholder="Enter Relationship Name"
                    smalltext="Enter the name of the relationship"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_parent"
                id="chkIsPatent"
                label="This relationship is a parent"
                component={renderCheckBox}
              />
              <Field
                name="is_active"
                id="chkIsActive"
                label="Activate current relatioship"
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
                Save relationship settings
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
              List of available relationships
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
                    {row.relation}
                  </Card.Subtitle>
                  <Typography mb={2}>
                    {row.is_parent
                      ? "This is a parent relationship"
                      : "This is not a parent relationship"}
                  </Typography>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is relationship active
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
  form: "GradesForm",
})(withStyles(styles)(Grades));
