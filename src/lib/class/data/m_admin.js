import m_contact from "./m_contact";

class m_admin extends m_contact {
  constructor(params = null) {
    super();
    if (params == null) {
      this._id = "";
    } else {
      super.set(params);
      this.set(params);
    }
  }

  set(values) {
    this.id = values._id;
  }
}

export default m_admin;
