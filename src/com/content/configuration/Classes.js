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
  renderHidden,
} from "../../../lib/global/helpers";
import m_class_section from "../../../lib/class/data/m_class_section";
import m_class from "../../../lib/class/data/m_class";
import { classSectionRequest } from "../../../lib/api/m/ClassSectionApi";
import { classRequest } from "../../../lib/api/m/ClassApi";

const styles = (theme) => ({});
const formName = "classForm";

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradeSelect: [],
      rows: [],
    };
    this.sections = [];
    this.refHeader = React.createRef();

    this.gradeSelect = [];
    this.sections.map((row, i) => {
      this.gradeSelect.push({ id: row.id, name: row.grade });
    });
  }

  loadData() {
    this.gradeSelect = [];
    classSectionRequest("retrieve")
      .then((response) => {
        this.sections = response.data;
        this.sections.map((row, i) => {
          this.gradeSelect.push({ id: row._id, name: row.grade });
        });

        if (this.sections.length == 0) return;
        this.loadClasses(this.sections[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadClasses(sectionID) {
    let classList = [];
    classRequest("find", {
      name: "class_section_id",
      value: sectionID,
    })
      .then((cresponse) => {
        cresponse.data.map((row, i) => {
          var section = this.sections.filter(
            (val) => val._id == row.class_section_id
          );
          let clss = new m_class(row);
          clss.__section = new m_class_section(section);
          classList.push(clss);
        });

        this.setState({ rows: classList });
        this.props.dispatch(initialize(formName, new m_class()));
      })
      .catch((error) => {
        throw error;
      });
  }

  componentDidMount() {
    this.loadData();
  }

  onSubmit = (values, dispatch) => {
    let path = values._id !== "" ? "update" : "add";
    values.__section = undefined;
    classRequest(path, values)
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
    classRequest("retrieveByID", { _id: id })
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

  onFilterChange(event) {
    let id = event.target.value;
    this.loadClasses(id);
  }

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
          Classes
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              grade classes
            </Card.Subtitle>
            <Card.Text>
              The classes for the declared grades are shown here.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Grade
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
                    name="class_section_id"
                    required="required"
                    type="text"
                    id="txtSection"
                    label="Select Grade"
                    smalltext="Select grade from the list"
                    items={this.gradeSelect}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6">
                  <Field
                    name="class_name"
                    required="required"
                    type="text"
                    id="txtClassName"
                    label="Grade Class"
                    placeholder="Enter Grade Class"
                    smalltext="Enter the grade class of the school"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_active"
                id="chkIsActive"
                type="checkbox"
                label="Activate the current class"
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
                Save grade class settings
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
              List of available classes already exists
            </Typography>
          </Col>
          <Col col="sm-12 lg-6" mt={4}>
            <Form.Group>
              <label htmlFor="chkSelectGrade">Select Grade</label>
              <Form.Select
                id="chkSelectGrade"
                onChange={this.onFilterChange.bind(this)}
              >
                {this.gradeSelect.map((item, i) => (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Form.Text text="muted" xs={12} md={6}>
                Select grade to load inherited classes
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
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
                  <Card.Subtitle mb="2" text="muted">
                    {row.class_name}
                  </Card.Subtitle>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is class active
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
  keepDirtyOnReinitialize: true,
  form: formName,
})(withStyles(styles)(Classes));
