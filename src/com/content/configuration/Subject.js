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
import df_subject from "../../../lib/class/data/df_subject";
import { classSectionRequest } from "../../../lib/api/m/ClassSectionApi";
import { subjectRequest } from "../../../lib/api/m/SubjectApi";

const styles = (theme) => ({});
const formName = "subjectForm";

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.sections = [];
    this.refHeader = React.createRef();

    this.gradeSelect = [];
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
        this.loadSubjects(this.sections[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadSubjects(sectionID) {
    let subjectList = [];
    subjectRequest("find", {
      name: "class_section_id",
      value: sectionID,
    })
      .then((cresponse) => {
        cresponse.data.map((row, i) => {
          var section = this.sections.filter(
            (val) => val._id == row.class_section_id
          );
          let clss = new df_subject(row);
          clss.__section = new m_class_section(section);
          subjectList.push(clss);
        });

        this.setState({ rows: subjectList });
        this.props.dispatch(initialize(formName, new df_subject()));
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
    subjectRequest(path, values)
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
    subjectRequest("retrieveByID", { _id: id })
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
    this.loadSubjects(id);
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
          Subjects
        </Typography>
        <Card mt={4}>
          <Card.Body>
            <Card.Subtitle mb="2" text="muted">
              class subjects
            </Card.Subtitle>
            <Card.Text>
              All the usable sujects for the specified grades are listed below.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card mt={4}>
          <Card.Body>
            <Card.Title mb="2" text="muted">
              Edit Subject
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
                    name="subject"
                    required="required"
                    type="text"
                    id="txtSubject"
                    label="Subject Name"
                    placeholder="Enter Subject Name"
                    smalltext="Enter the subject name"
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
                Save class grade settings
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
              <Card mt={4} id={row.id}>
                <Card.Body>
                  <Card.Title>
                    {row._id}
                    <Edit
                      style={{ float: "right", cursor: "pointer" }}
                      onClick={this.onEditClick.bind(this, row._id)}
                    />
                  </Card.Title>
                  <Card.Subtitle mb="2" text="muted">
                    {row.subject}
                  </Card.Subtitle>
                  <Card.Text mb="2" text="muted">
                    {row.__section.grade}
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
  form: "subjectForm",
})(withStyles(styles)(Subject));
