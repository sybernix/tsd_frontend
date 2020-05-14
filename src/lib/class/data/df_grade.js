import df_subject from "./df_subject";

class df_grade {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.min_marks = 0;
      this.max_marks = 0;
      this.subject_id = 0;
      this.grade = "";
      this.is_active = true;

      this.__subject = new df_subject();
    } else {
      this.set(params);
    }
  }

  set(values) {
    this._id = values._id;
    this.min_marks = values.min_marks;
    this.max_marks = values.max_marks;
    this.grade = values.grade;
    this.is_active = values.is_active;

    this.__subject = values.__subject;
  }
}

export default df_grade;
