import m_class_section from "./m_class_section";

class m_class {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.class_name = "";
      this.class_section_id = "";
      this.is_active = true;

      this.__section = new m_class_section();
    } else this.set(params);
  }

  set(values) {
    this.id = values.id;
    this.class_name = values.class_name;
    this.class_section_id = values.class_section_id;
    this.is_active = values.is_active;

    this.__section = values.__section;
  }
}

export default m_class;
