import df_occupation_category from "../../../lib/class/data/df_occupation_category";

class df_occupation {
  constructor(params = null) {
    if (params == null) {
      this.id = "";
      this.occupation_category_id = "";
      this.occupation = "";
      this.is_active = true;

      this.__category = new df_occupation_category();
    } else this.set(params);
  }

  set(values) {
    this.id = values.id;
    this.occupation_category_id = values.occupation_category_id;
    this.occupation = values.occupation;
    this.is_active = values.is_active;

    this.__category = values.__category;
  }
}

export default df_occupation;
