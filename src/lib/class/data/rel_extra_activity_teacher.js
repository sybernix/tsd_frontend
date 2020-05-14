import m_teacher from "./m_teacher";

class rel_extra_activity_teacher {
  constructor() {
    this._id = "";
    this.extra_activity_id = "";
    this.teacher_id = "";
    this.start_date = new Date();
    this.end_date = null;

    this.__teacher = new m_teacher();
  }

  set(values) {
    this._id = values._id;
    this.extra_activity_id = values.extra_activity_id;
    this.teacher_id = values.teacher_id;
    this.end_date = values.end_date;
    this.end_date = values.end_date;

    this.__teacher = values.__teacher;
  }
}

export default rel_extra_activity_teacher;
