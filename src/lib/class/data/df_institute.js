class df_institute {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.name = "";
      this.is_active = true;
    } else this.set(params);
  }

  set(values) {
    this.id = values.id;
    this.name = values.name;
  }
}

export default df_institute;
