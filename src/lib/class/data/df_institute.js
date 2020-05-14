class df_institute {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.name = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this._id = values._id;
    this.name = values.name;
  }
}

export default df_institute;
