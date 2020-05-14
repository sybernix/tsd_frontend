class df_title {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.title = "";
    } else {
      this.set(params);
    }
  }

  set(values) {
    this.id = values._id;
    this.title = values.title;
  }
}

export default df_title;
