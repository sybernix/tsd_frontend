import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
  renderRadio,
} from "../../../lib/global/helpers";

import df_title from "../../../lib/class/data/df_title";
import df_user_type from "../../../lib/class/data/df_user_type";
import df_access_level from "../../../lib/class/data/df_access_level";

const styles = (theme) => ({});

class Contact extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.selectTitles = [];
    this.selectUserTypes = [];
    this.selectAccessLevels = [];

    this.titles.map((row, i) => {
      this.selectTitles.push({ id: row.id, name: row.title });
    });

    this.userTypes.map((row, i) => {
      this.selectUserTypes.push({ id: row.id, name: row.type_name });
    });

    this.accessLevels.map((row, i) => {
      this.selectAccessLevels.push({ id: row.id, name: row.level });
    });

    this.sexLevels = ["Male", "Female"];
  }

  titles = [
    new df_title({ id: "a2s1d2asd3546asd", title: "Master" }),
    new df_title({ id: "524a6s5d46a1sdsa", title: "Mr." }),
    new df_title({ id: "524a6s5dsda1sd21", title: "Miss" }),
    new df_title({ id: "524a6s5d46a1ssdf", title: "Mrs." }),
    new df_title({ id: "524a6s5d46a1fsdd", title: "Ms" }),
    new df_title({ id: "524a6s5d46a1fsdd", title: "Sir" }),
    new df_title({ id: "524a6s5d46a1fsdd", title: "Hon" }),
    new df_title({ id: "524a6s5d46a1fsdd", title: "Ven" }),
    new df_title({ id: "524a6s5d46a1fsdd", title: "Hon" }),
    new df_title({ id: "524a6s5d46a1fsdd", title: "Dr" }),
  ];

  userTypes = [
    new df_user_type({ id: "a2s1d2asd3546asd", type_name: "admin" }),
    new df_user_type({ id: "524a6s5d46a1sdsa", type_name: "teacher" }),
    new df_user_type({ id: "524a6s5dsda1sd21", type_name: "parent" }),
    new df_user_type({ id: "524a6s5d46a1ssdf", type_name: "student" }),
  ];

  accessLevels = [
    new df_access_level({
      id: "a2s1d2asd3546asd",
      level: "admin",
      is_admin: true,
      created_date: new Date(),
      is_active: true,
    }),
    new df_access_level({
      id: "524a6s5d46a1sd21",
      level: "teacher",
      is_admin: false,
      created_date: new Date(),
      is_active: true,
    }),
    new df_access_level({
      id: "324a68da323a2s4d",
      level: "parent",
      is_admin: false,
      created_date: new Date(),
      is_active: true,
    }),
    new df_access_level({
      id: "a56s4dasd121a23s",
      level: "student",
      is_admin: false,
      created_date: new Date(),
      is_active: true,
    }),
  ];

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <div className="contact">
        <Row>
          <Col col="sm-12 md-6">
            <Field
              name="nic"
              type="text"
              id="txtNIC"
              label="National identitiy number"
              placeholder="NIC number"
              smalltext="Enter the national identity card number of the user"
              component={renderTextBox}
            />
          </Col>
        </Row>
        <Row>
          <Col col="sm-12 md-6">
            <Field
              name="email"
              type="email"
              id="txtEmail"
              label="Email address"
              placeholder="Email address"
              smalltext="Enter email address"
              component={renderTextBox}
            />
          </Col>
        </Row>
        <Row>
          <Col col="sm-12 md-6">
            <Field
              name="passport"
              type="text"
              id="txtPassport"
              label="Passport Number"
              placeholder="Passport number"
              smalltext="Enter passport number"
              component={renderTextBox}
            />
          </Col>
        </Row>
        <Row>
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="sex"
              label="Select Gender"
              smalltext="Select gender of the user"
              items={this.sexLevels}
              component={renderRadio}
            />
          </Col>
        </Row>
        <hr />
        <Row mb="2">
          <Col col="sm-12">
            <Typography component="h6" variant="h6" align="left">
              Name
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="title_id"
              required="required"
              id="cmbTitle"
              label="Select Title"
              smalltext="Select title of the user"
              items={this.selectTitles}
              component={renderSelect}
            />
          </Col>
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="first_name"
              type="text"
              id="txtFirstName"
              label="First Name"
              placeholder="First Name"
              smalltext="Enter first name of the user"
              component={renderTextBox}
            />
          </Col>
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="second_name"
              type="text"
              id="txtSecondName"
              label="Second Name"
              placeholder="Second Name"
              smalltext="Enter second name of the user"
              component={renderTextBox}
            />
          </Col>
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="last_name"
              type="text"
              id="txtLastName"
              label="Last Name"
              placeholder="Last Name"
              smalltext="Enter last name of the user"
              component={renderTextBox}
            />
          </Col>
        </Row>
        <hr />
        <Row mb="2">
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="dob"
              type="date"
              id="txtDOB"
              label="Date of birth"
              placeholder="Date of birth"
              smalltext="Enter date of birth of the user"
              component={renderTextBox}
            />
          </Col>
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="phone"
              type="text"
              id="txtPhone"
              label="Telephone number"
              placeholder="Telephone"
              smalltext="Enter primary phone number of the user"
              component={renderTextBox}
            />
          </Col>
        </Row>
        <hr />
        <Row mb="2">
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="access_level_id"
              id="cmbAccessLevel"
              label="Select access level"
              smalltext="Users access level for the system"
              items={this.selectAccessLevels}
              component={renderSelect}
            />
          </Col>
          <Col col="sm-12 md-6 lg-4">
            <Field
              name="user_type_id"
              id="cmbUserType"
              label="User Type"
              disabled
              smalltext="The user type is auto selected"
              items={this.selectUserTypes}
              selected="teacher"
              component={renderSelect}
            />
          </Col>
          <Col col="sm-12">
            <Field
              name="is_active"
              id="chkIsActive"
              label="Activate the user"
              component={renderCheckBox}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(Contact);
