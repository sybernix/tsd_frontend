class m_class_section {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.grade = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this.id = values.id;
    this.grade = values.grade;
    this.is_active = values.is_active;
  }
}

export default m_class_section;
