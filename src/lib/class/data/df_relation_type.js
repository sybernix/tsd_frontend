class df_relation_type {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.relation = "";
      this.is_parent = false;
      this.is_active = true;
    } else this.set(params);
  }

  set(valus) {
    this.id = valus.id;
    this.relation = valus.relation;
    this.is_parent = valus.is_parent;
    this.is_active = valus.is_active;
  }
}

export default df_relation_type;
