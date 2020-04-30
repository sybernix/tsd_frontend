class df_extra_activity_position {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.position = "";
      this.is_active = true;
    } else {
      this.set(params);
    }
  }

  set(values) {
    this.id = values.id;
    this.position = values.position;
    this.is_active = values.is_active;
  }
}

export default df_extra_activity_position;
