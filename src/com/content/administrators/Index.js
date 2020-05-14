import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";
import { Field, reduxForm, reset, initialize, FormSection } from "redux-form";
import { Row, Col, Card, Form, Button } from "bootstrap-4-react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import addNotification from "react-push-notification";

import { renderHidden } from "../../../lib/global/helpers";
import m_admin from "../../../lib/class/data/m_admin";
import Contact from "../__common/Contact";
import { contactRequest } from "../../../lib/api/m/ContactApi";

const styles = (theme) => ({
  noPadding: {
    padding: 0,
  },
});
const formName = "administratorForm";

class Administrator extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, rows: [] };
    this.refHeader = React.createRef();
    this.refSearch = React.createRef();
    const admin = new m_admin();
    this.props.dispatch(initialize(formName, admin));
  }

  onSearch = (value) => {
    let admins = [];
    this.setState({ isLoading: true });
    if (value.length < 4) return;
    contactRequest("find", {
      userType: "admin",
      name: "nic",
      value: value,
    })
      .then((response) => {
        response.data.map((row, i) => {
          admins.push({
            id: row._id,
            nic: row.nic,
            title: row.title,
            name: row.first_name,
          });
        });
        this.setState({ rows: admins, isLoading: false });
      })
      .catch((error) => {
        throw error;
      });
  };

  searchSelect = (values) => {
    contactRequest("retrieveByID", { userType: "admin", _id: values[0].id })
      .then((response) => {
        window.scrollTo(0, this.refHeader.current.offsetTop);
        const data = response.data;
        const admin = new m_admin(data);
        this.props.dispatch(initialize(formName, admin));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSubmit = (values, dispatch) => {
    console.log(values);
    values.userType = "admin";
    let path = values._id !== "" ? "update" : "add";
    contactRequest(path, values)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);

        addNotification({
          title: "Success",
          subtitle: "Save New Administrator",
          message: response.data.message,
          theme: "darkblue",
          native: true,
        });

        dispatch(reset(formName));
        this.refSearch.current.clear();
        const admin = new m_admin();
        this.props.dispatch(initialize(formName, admin));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes, handleSubmit, submitting } = this.props;

    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
          Administrators
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              administrator accounts
            </Card.Subtitle>
            <Card.Text>
              The administrators are listed below, the users who have the
              administrative privileges.
            </Card.Text>
            <Row>
              <Col col="sm-10 md-6">
                <AsyncTypeahead
                  isLoading={this.state.isLoading}
                  onSearch={this.onSearch}
                  onChange={this.searchSelect}
                  labelKey={(option) => `(${option.nic}) ${option.name}`}
                  ref={this.refSearch}
                  options={this.state.rows}
                  placeholder="who do you want to search?"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted" ref={this.refHeader}>
              Edit Administrator
            </Card.Title>
            <hr />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row mb="2">
                <Col col="sm-12">
                  <Typography component="h6" variant="h6" align="left">
                    Identification
                  </Typography>
                </Col>
              </Row>
              <Field
                name="_id"
                id="txtID"
                type="hidden"
                component={renderHidden}
              />
              <FormSection name="">
                <Contact type="admin" />
              </FormSection>

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
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  form: formName,
})(withStyles(styles)(Administrator));
