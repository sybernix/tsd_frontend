import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { Edit } from "@material-ui/icons";
import { Row, Col, Card, Button } from "bootstrap-4-react";

import df_title from "../../../lib/class/data/df_title";
import Call from "../../../lib/api/Call";
import { renderTextBox } from "../../../lib/global/helpers";

const styles = (theme) => ({});

class Titles extends Component {
  constructor(props) {
    super(props);
  }

  rows = [
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
          Honorifics
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              honorifics
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
              Edit honorific
            </Card.Title>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="title"
                    required="required"
                    type="text"
                    id="txtTitle"
                    label="Honorific"
                    placeholder="Enter Honorific"
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
                Save honorifics settings
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
              List of available honorifics
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
                    {row.title}
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
})(withStyles(styles)(Titles));
