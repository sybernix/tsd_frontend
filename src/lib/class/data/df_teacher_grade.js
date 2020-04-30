class df_teacher_grade {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.level = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this.id = values.id;
    this.level = values.level;
  }
}

export default df_teacher_grade;
