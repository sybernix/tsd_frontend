class df_ed_speciality {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.speciality = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this._id = values._id;
    this.speciality = values.speciality;
  }
}

export default df_ed_speciality;
