class df_marital_status {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.status = "";
    } else this.set(params);
  }

  set(values) {
    this._id = values._id;
    this.status = values.status;
  }
}

export default df_marital_status;
