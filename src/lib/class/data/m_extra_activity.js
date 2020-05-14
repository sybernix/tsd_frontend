import df_extra_activity_type from "./df_extra_activity_type";

class m_extra_activity {
  constructor() {
    this._id = "";
    this.extra_activity_type_id = "";
    this.activity_name = "";
    this.established_date = null;
    this.is_active = false;

    this.__extra_activity_type = new df_extra_activity_type();
  }

  set(values) {
    this._id = values._id;
    this.extra_activity_type_id = values.activity_type_id;
    this.activity_name = values.activity_name;
    this.established_date = values.established_date;
    this.is_active = values.is_active;

    this.__extra_activity_type = values.__extra_activity_type;
  }
}

export default m_extra_activity;
