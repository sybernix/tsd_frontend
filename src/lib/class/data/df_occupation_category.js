class df_occupation_category {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.category = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this._id = values._id;
    this.category = values.category;
    this.is_active = values.category;
  }
}

export default df_occupation_category;
