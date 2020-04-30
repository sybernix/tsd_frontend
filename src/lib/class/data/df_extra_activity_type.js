class df_extra_activity_type {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.type = "";
      this.is_active = true;
    } else {
      this.set(params);
    }
  }

  set(values) {
    this.id = values.id;
    this.type = values.type;
    this.is_active = values.is_active;
  }
}

export default df_extra_activity_type;
