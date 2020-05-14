import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Edit, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";

import {
  renderTextBox,
  renderHidden,
  renderSelect,
} from "../../../lib/global/helpers";
import df_user_type from "../../../lib/class/data/df_user_type";
import { userTypeRequest } from "../../../lib/api/df/UserTypeApi";

const styles = (theme) => ({});
const formName = "userTypeForm";

class UserTypes extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.refHeader = React.createRef();
    this.selectUserTypes = [];
    this.selectUserTypes.push(
      { id: "admin", name: "admin" },
      { id: "teacher", name: "teacher" },
      { id: "parent", name: "parent" },
      { id: "student", name: "student" }
    );
  }

  loadData() {
    userTypeRequest("retrieve")
      .then((response) => {
        this.setState({ rows: response.data });
        this.props.dispatch(initialize(formName, new df_user_type()));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  onSubmit = (values, dispatch) => {
    let path = values._id !== "" ? "update" : "add";
    userTypeRequest(path, values)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
        dispatch(reset(formName));
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onEditClick(id) {
    userTypeRequest("retrieveByID", { _id: id })
      .then((response) => {
        window.scrollTo(0, this.refHeader.current.offsetTop);
        const data = response.data;
        const initialValues = data;
        this.props.dispatch(initialize(formName, initialValues));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Typography
          component="h1"
          variant="h5"
          align="left"
          ref={this.refHeader}
        >
          User Types
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              user types
            </Card.Subtitle>
            <Card.Text>
              These velues indicate user levels of the system. They are readonly
              and cannot be changed.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit User Type
            </Card.Title>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="_id"
                id="txtID"
                type="hidden"
                component={renderHidden}
              />
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="type_name"
                    required="required"
                    type="text"
                    id="txtTypeName"
                    label="Type Map"
                    placeholder="Enter Type Name"
                    smalltext="Don't change this unless you know what you are doing"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="type"
                    required="required"
                    id="txtType"
                    label="Select User Type"
                    placeholder="Select User Type"
                    smalltext="Select the user type from the list"
                    items={this.selectUserTypes}
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
                Save access level settings
              </Button>
              <Button
                secondary
                type="reset"
                color="secondary"
                mr={2}
                mt={2}
                onClick={reset}
              >
                Clear changes
              </Button>
            </form>
          </Card.Body>
        </Card>

        <Row>
          <Col col="sm-12" mt={4}>
            <Typography component="h2" variant="h6" align="left">
              List of available User Types
            </Typography>
          </Col>

          {this.state.rows.map((row, i) => (
            <Col col="sm-12 md-6 lg-6 xl-4" key={i}>
              <Card mt={4} id={row._id}>
                <Card.Body>
                  <Card.Title>
                    {row._id}
                    <Edit
                      style={{ float: "right", cursor: "pointer" }}
                      onClick={this.onEditClick.bind(this, row._id)}
                    />
                  </Card.Title>
                  <Card.Text mb="2" text="muted">
                    {row.type_name}
                  </Card.Text>
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
  keepDirtyOnReinitialize: true,
  form: formName,
})(withStyles(styles)(UserTypes));
