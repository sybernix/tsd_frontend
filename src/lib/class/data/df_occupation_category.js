class df_occupation_category {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.category = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this.id = values.id;
    this.category = values.category;
    this.is_active = values.category;
  }
}

export default df_occupation_category;
