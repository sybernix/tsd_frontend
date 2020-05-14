import m_student from "./m_student";
import df_extra_activity_position from "./df_extra_activity_position";

class rel_student_activity_position {
  constructor() {
    this._id = "";
    this.student_id = "";
    this.extra_activity_position_id = "";
    this.start_date = new Date();
    this.end_date = null;
    this.is_active = true;

    this.__student = new m_student();
    this.__extra_activity_position = new df_extra_activity_position();
  }

  set(values) {
    this._id = values._id;
    this.student_id = values.student_id;
    this.extra_activity_position_id = values.extra_activity_position_id;
    this.start_date = values.start_date;
    this.end_date = values.end_date;
    this.is_active = values.is_active;

    this.__student = values.__student;
    this.__extra_activity_position = values.__extra_activity_position;
  }
}

export default rel_student_activity_position;
