import m_contact from "./m_contact";

class m_admin extends m_contact {
  constructor() {
    super();
    this.id = "";
  }

  set(values) {
    super.set(this);
    this.id = "";
  }
}

export default m_admin;
