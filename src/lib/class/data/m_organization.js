class m_organization {
  constructor(params = null) {
    if (params == null) {
      this._id = "";
      this.name = "";
      this.line1 = "";
      this.line2 = "";
      this.line3 = "";
      this.city = "";
      this.postcode = "";
      this.key = "";
    } else this.set(params);
  }

  set(values) {
    this._id = values._id;
    this.name = values.name;
    this.line1 = values.line1;
    this.line2 = values.line2;
    this.line3 = values.line3;
    this.city = values.city;
    this.postcode = values.postcode;
    this.key = values.key;
  }
}

export default m_organization;
