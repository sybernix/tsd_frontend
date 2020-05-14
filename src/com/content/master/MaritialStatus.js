import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Edit } from "@material-ui/icons";
import { Row, Col, Card, Button } from "bootstrap-4-react";

import df_marital_status from "../../../lib/class/data/df_marital_status";
import { renderTextBox, renderHidden } from "../../../lib/global/helpers";
import { maritalStatusRequest } from "../../../lib/api/df/MaritalStatusApi";

const styles = (theme) => ({});
const formName = "maritialStstusForm";

class MaritialStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.refHeader = React.createRef();
  }

  loadData() {
    maritalStatusRequest("retrieve")
      .then((response) => {
        this.setState({ rows: response.data });
        let status = new df_marital_status();
        this.props.dispatch(initialize(formName, status));
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
    maritalStatusRequest(path, values)
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

  onEditClick = (id) => {
    console.log(id);
    maritalStatusRequest("retrieveByID", { _id: id })
      .then((response) => {
        window.scrollTo(0, this.refHeader.current.offsetTop);
        const data = response.data;
        const initialValues = data;
        this.props.dispatch(initialize(formName, initialValues));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes, handleSubmit, submitting, reset } = this.props;
    return (
      <div>
        <Typography
          component="h1"
          variant="h5"
          align="left"
          ref={this.refHeader}
        >
          Maritial Status
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              maritial status
            </Card.Subtitle>
            <Card.Text>
              These predefined values can be used while saveing the user
              profiles.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Status
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
                    name="status"
                    required="required"
                    type="text"
                    id="txtMaritialStatus"
                    label="Maritial Status"
                    placeholder="Enter Maritial Status"
                    smalltext="Don't change this unless you know what you are doing"
                    component={renderTextBox}
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
                Save status settings
              </Button>
              <Button
                secondary
                type="reset"
                color="secondary"
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
              List of available Status Codes
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
                    {row.status}
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
})(withStyles(styles)(MaritialStatus));
