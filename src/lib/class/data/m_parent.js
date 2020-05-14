import df_maritial_status from "./df_maritial_status";
import df_occupation from "./df_occupation";
import m_contact from "./m_contact";

class m_parent extends m_contact {
  constructor() {
    super();
    this._id = "";
    this.occupation_id = "";
    this.marital_status_id = "";
    this.is_active = "";

    this.__occupation = new df_occupation();
    this.__marital_status = new df_maritial_status();
  }

  set(values) {
    super.set(this);
    this._id = values.id;
    this.occupation_id = values.occupation_id;
    this.marital_status_id = values.marital_status_id;
    this.is_active = values.active;

    this.__occupation = values.__occupation;
    this.__marital_status = values.__marital_status;
  }
}

export default m_parent;
