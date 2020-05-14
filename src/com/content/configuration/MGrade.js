import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, reduxForm, reset, initialize } from "redux-form";
import { Edit, DeleteOutline } from "@material-ui/icons";
import { Row, Col, Card, Form, Button, Grid } from "bootstrap-4-react";

import {
  renderTextBox,
  renderCheckBox,
  renderSelect,
  renderHidden,
} from "../../../lib/global/helpers";
import m_class_section from "../../../lib/class/data/m_class_section";
import df_subject from "../../../lib/class/data/df_subject";
import df_grade from "../../../lib/class/data/df_grade";
import { classSectionRequest } from "../../../lib/api/m/ClassSectionApi";
import { subjectRequest } from "../../../lib/api/m/SubjectApi";
import { gradeRequest } from "../../../lib/api/df/GradeApi";

const styles = (theme) => ({});
const formName = "gradeForm";

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectSelect: [],
      rows: [],
    };
    this.sections = [];
    this.subjects = [];
    this.refHeader = React.createRef();

    this.sectionSelect = [];
  }

  loadSections() {
    this.sections = [];
    this.sectionSelect = [];
    classSectionRequest("retrieve")
      .then((response) => {
        response.data.map((row, i) => {
          this.sectionSelect.push({ id: row._id, name: row.grade });
          this.sections.push(new m_class_section(row));
        });
        if (this.sections.length == 0) return;
        this.loadSubjects(this.sections[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadSubjects(sectionID) {
    this.subjects = [];
    let subList = [];
    subjectRequest("find", {
      name: "class_section_id",
      value: sectionID,
    })
      .then((response) => {
        response.data.map((row, i) => {
          var section = this.sections.filter(
            (val) => val._id == row.class_section_id
          );
          let clss = new df_subject(row);
          clss.__section = section[0];
          this.subjects.push(clss);
          subList.push({ id: row._id, name: row.subject });
        });
        this.setState({ subjectSelect: subList });

        if (this.subjects.length == 0) return;
        this.loadGrades(this.subjects[0]._id);
      })
      .catch((error) => {
        throw error;
      });
  }

  loadGrades(subjectID) {
    let grdList = [];
    gradeRequest("find", {
      name: "subject_id",
      value: subjectID,
    })
      .then((response) => {
        response.data.map((row, i) => {
          var subject = this.subjects.filter(
            (val) => val._id == row.subject_id
          );
          let clss = new df_grade(row);
          clss.__subject = subject[0];
          console.log(clss);
          grdList.push(clss);
        });
        this.setState({ rows: grdList });
        this.props.dispatch(initialize(formName, new df_grade()));
      })
      .catch((error) => {
        throw error;
      });
  }

  componentDidMount() {
    this.loadSections();
  }

  onSubmit = (values, dispatch) => {
    let path = values._id !== "" ? "update" : "add";
    values.__subject = undefined;
    gradeRequest(path, values)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
        dispatch(reset(formName));
        this.loadSections();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onEditClick(id) {
    gradeRequest("retrieveByID", { _id: id })
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

  onGradeChange(event) {
    let id = event.target.value;
    this.loadSubjects(id);
  }

  onSubjectChange(event) {
    let id = event.target.value;
    this.loadGrades(id);
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
          Grades
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              Marking Grades
            </Card.Subtitle>
            <Card.Text>
              All the usable sujects for the specified grades are listed below.
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
                  <Form.Select
                    id="chkSelectGrade"
                    onChange={this.onGradeChange.bind(this)}
                  >
                    {this.sectionSelect.map((item, i) => (
                      <option value={item.id} key={i}>
                        {item.name}
                      </option>
                    ))}
                    ;
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-10 lg-6" mt={2}>
                  <Field
                    name="subject_id"
                    required="required"
                    type="text"
                    id="cmbSubject"
                    label="Select Subject"
                    smalltext="Select subject from desired section"
                    items={this.state.subjectSelect}
                    component={renderSelect}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="min_marks"
                    required="required"
                    type="number"
                    id="txtMinMarks"
                    label="Minimum Marks"
                    placeholder="Marks"
                    smalltext="Enter minimimum marks to get the grade"
                    component={renderTextBox}
                  />
                </Col>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="max_marks"
                    required="required"
                    type="number"
                    id="txtMaxMarks"
                    label="Maximum Marks"
                    placeholder="Marks"
                    smalltext="Enter maximum marks to get the grade"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Row>
                <Col col="sm-12 md-6 lg-4">
                  <Field
                    name="grade"
                    required="required"
                    type="text"
                    id="txtGrade"
                    label="Enter Grade"
                    placeholder="Enter Grade"
                    smalltext="Enter grade"
                    component={renderTextBox}
                  />
                </Col>
              </Row>
              <Field
                name="is_active"
                id="chkIsActive"
                type="checkbox"
                label="Activate the current subject"
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
                Save grade settings
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
              List of available grades already exists
            </Typography>
          </Col>
          <Col col="sm-12 lg-6" mt={4}>
            <Form.Group>
              <label htmlFor="chkSelectGrade">Select Grade</label>
              <Form.Select
                id="chkSelectFilterGrade"
                onChange={this.onGradeChange.bind(this)}
              >
                {this.sectionSelect.map((item, i) => (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Form.Text text="muted" xs={12} md={6}>
                Select section to load inherited subjects
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col col="sm-12 lg-6">
            <Form.Group>
              <label htmlFor="chkSelectGrade">Select Subject</label>
              <Form.Select
                id="chkSelectFilterSubject"
                onChange={this.onSubjectChange.bind(this)}
              >
                {this.state.subjectSelect.map((item, i) => (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Form.Text text="muted" xs={12} md={6}>
                Select subject to load inherited grades
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
                    {row.grade}
                  </Card.Subtitle>
                  <Card.Text mb="2" text="muted">
                    {row.__subject.subject} {" - "}
                    {row.__subject.__section.grade}
                  </Card.Text>
                  <Form.Group>
                    <Form.CustomCheckbox
                      checked={row.is_active ? "checked" : ""}
                      disabled
                    >
                      Is grade active
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
  form: "gradeForm",
})(withStyles(styles)(Subject));
