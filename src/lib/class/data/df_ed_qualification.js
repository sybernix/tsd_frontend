class df_ed_qualification {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.qualification = "";
      this.sort_order = 0;
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this._id = values._id;
    this.qualification = values.qualification;
    this.sort_order = values.sort_order;
    this.is_active = values.is_active;
  }
}

export default df_ed_qualification;
