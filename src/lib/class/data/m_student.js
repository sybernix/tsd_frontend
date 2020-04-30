import m_contact from "./m_contact";

class m_student extends m_contact {
  constructor() {
    super();
    this.id = "";
    this.reg_no = "";
    this.reg_date = null;
    this.end_date = null;
  }

  set(values) {
    super.set(this);
    this.id = values.id;
    this.reg_no = values.reg_no;
    this.reg_date = values.reg_date;
    this.end_date = values.end_date;
  }
}

export default m_student;
