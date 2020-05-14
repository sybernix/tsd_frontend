class df_access_level {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.level = "";
      this.is_admin = false;
      this.created_date = new Date();
      this.is_active = true;
    } else this.set(params);
  }

  set(params) {
    this._id = params._id;
    this.level = params.level;
    this.is_admin = params.is_admin;
    this.created_date = params.created_date;
    this.is_active = params.is_active;
  }
}

export default df_access_level;
