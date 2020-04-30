import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { Edit } from "@material-ui/icons";
import { Row, Col, Card, Button } from "bootstrap-4-react";

import df_marital_status from "../../../lib/class/data/df_marital_status";
import Call from "../../../lib/api/Call";
import { renderTextBox } from "../../../lib/global/helpers";

const styles = (theme) => ({});

class MaritialStatus extends Component {
  constructor(props) {
    super(props);
  }

  rows = [
    new df_marital_status({ id: "a2s1d2asd3546asd", status: "Married" }),
    new df_marital_status({ id: "524a6s5d46a1sdsa", status: "Widowed" }),
    new df_marital_status({ id: "524a6s5dsda1sd21", status: "Separated" }),
    new df_marital_status({ id: "524a6s5d46a1ssdf", status: "Divorced" }),
    new df_marital_status({ id: "524a6s5d46a1fsdd", status: "Single" }),
  ];

  onSubmit = (values) => {
    console.log(values);
    Call.Request("maritialstatus", null, values)
      .then((response) => {})
      .catch(() => {});
  };

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Typography component="h1" variant="h5" align="left">
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
              <Button secondary type="reset" color="secondary" mt={2}>
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

          {this.rows.map((row, i) => (
            <Col col="sm-12 md-6 lg-6 xl-4" key={i}>
              <Card mt={4} id={row.id}>
                <Card.Body>
                  <Card.Title>
                    <Edit style={{ float: "right" }} />
                    {row.id}
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
  form: "maritialStstusForm",
})(withStyles(styles)(MaritialStatus));
