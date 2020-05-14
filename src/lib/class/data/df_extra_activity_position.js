class df_extra_activity_position {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.position = "";
      this.is_active = true;
    } else {
      this.set(params);
    }
  }

  set(values) {
    this._id = values._id;
    this.position = values.position;
    this.is_active = values.is_active;
  }
}

export default df_extra_activity_position;
