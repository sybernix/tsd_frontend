class df_extra_activity_type {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.type = "";
      this.is_active = true;
    } else {
      this.set(params);
    }
  }

  set(values) {
    this._id = values._id;
    this.type = values.type;
    this.is_active = values.is_active;
  }
}

export default df_extra_activity_type;
