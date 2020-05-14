import m_contact from "./m_contact";
import df_teacher_grade from "./df_teacher_grade";
import df_marital_status from "./df_marital_status";

class m_teacher extends m_contact {
  constructor() {
    super();
    this._id = "";
    this.reg_no = "";
    this.reg_date = null;
    this.end_date = null;
    this.teacher_grade_id = "";
    this.marital_status_id = "";

    this.__teacher_grade = new df_teacher_grade();
    this.__marital_status = new df_marital_status();
  }

  set(values) {
    super.set(this);
    this._id = values._id;
    this.reg_no = values.reg_no;
    this.teacher_grade_id = values.teacher_grade_id;
    this.reg_date = values.reg_date;
    this.end_date = values.end_date;
    this.marital_status_id = values.marital_status_id;

    this.__teacher_grade = values.__teacher_grade;
    this.__marital_status = values.__marital_status;
  }
}

export default m_teacher;
