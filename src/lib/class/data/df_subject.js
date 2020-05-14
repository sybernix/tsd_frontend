import m_class_section from "./m_class_section";

class df_subject {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.subject = "";
      this.class_section_id = 0;
      this.is_active = true;

      this.__section = new m_class_section();
    } else {
      this.set(params);
    }
  }

  set(values) {
    this._id = values._id;
    this.subject = values.subject;
    this.class_section_id = values.class_section_id;
    this.is_active = values.is_active;

    this.__section = values.__section;
  }
}

export default df_subject;
