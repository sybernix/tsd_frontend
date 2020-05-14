class df_teacher_grade {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.level = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this._id = values._id;
    this.level = values.level;
  }
}

export default df_teacher_grade;
