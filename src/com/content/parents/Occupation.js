import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Field, reduxForm } from "redux-form";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import df_occupation from "../../../lib/class/data/df_occupation";
import df_occupation_category from "../../../lib/class/data/df_occupation_category";
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

    this.selectCategory = [];
    this.categories.map((row, i) => {
      this.selectCategory.push({ id: row.id, name: row.category });
    });
  }

  categories = [
    new df_occupation_category({
      id: "asd23as7daasd2",
      category: "Engineering",
    }),
    new df_occupation_category({
      id: "asd23as7daadssd2",
      category: "Medical",
    }),
  ];

  rows = [
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
          Occupation
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
              Edit Occupation
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="occupation"
                    required="required"
                    type="text"
                    id="txtOccupation"
                    label="Occupation Name"
                    placeholder="Enter Occupation Name"
                    smalltext="Enter the common name of the ocupation"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="occupation_category_id"
                    required="required"
                    type="text"
                    id="txtCategory"
                    label="Occupation Category"
                    placeholder="Select Occupation Category"
                    smalltext="Enter the category of the ocupation"
                    items={this.selectCategory}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <Field
                name="is_active"
                id="chkIsActive"
                label="Activate current category"
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
                Save occupation settings
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
              List of available occupations
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
                    {row.occupation}
                  </Card.Subtitle>
                  <Typography>{row.__category.category}</Typography>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is category active
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
