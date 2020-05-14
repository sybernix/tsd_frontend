import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Edit, DeleteOutline } from "@material-ui/icons";
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

import { titleRequest } from "../../../lib/api/df/TitleApi";
import { userTypeRequest } from "../../../lib/api/df/UserTypeApi";
import { accessLevelRequest } from "../../../lib/api/df/AccessLevelApi";

const styles = (theme) => ({});
const formName = "accessLevelForm";

class Contact extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectTitles: [],
      selectUserTypes: [],
      selectAccessLevels: [],
    };
    this.titles = [];
    this.userTypes = [];
    this.accessLevels = [];
    this.sexLevels = [
      { id: "M", name: "Male" },
      { id: "F", name: "Female" },
    ];
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.loadTitles();
    this.loadAccessLevels();
    this.loadUserTypes();
  }

  loadTitles() {
    titleRequest("retrieve")
      .then((response) => {
        this.titles = response.data;
        let selectTitles = [];
        this.titles.map((row, i) => {
          selectTitles.push({ id: row._id, name: row.title });
        });
        this.setState({ selectTitles: selectTitles });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadAccessLevels() {
    accessLevelRequest("retrieve")
      .then((response) => {
        this.accessLevels = response.data;
        let selectAccessLevels = [];
        this.accessLevels.map((row, i) => {
          selectAccessLevels.push({ id: row._id, name: row.level });
        });
        this.setState({ selectAccessLevels: selectAccessLevels });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadUserTypes() {
    userTypeRequest("retrieve")
      .then((response) => {
        this.userTypes = response.data;
        let selectUserTypes = [];
        this.userTypes.map((row, i) => {
          selectUserTypes.push({ id: row._id, name: row.type_name });
        });
        console.log(selectUserTypes);

        this.setState({ selectUserTypes: selectUserTypes });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
              items={this.state.selectTitles}
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
              name="middle_name"
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
              items={this.state.selectAccessLevels}
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
              items={this.state.selectUserTypes}
              selected="teacher"
              component={renderSelect}
            />
          </Col>
          <Col col="sm-12">
            <Field
              name="is_active"
              id="chkIsActive"
              type="checkbox"
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
