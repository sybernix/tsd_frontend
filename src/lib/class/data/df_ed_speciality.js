class df_ed_speciality {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.speciality = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this.id = values.id;
    this.speciality = values.speciality;
  }
}

export default df_ed_speciality;
