class m_organization {
    constructor(){
        this.id = "";
        this.name = "";
        this.line1 = "";
        this.line2 = "";
        this.line3 = "";
        this.city = "";
        this.postcode = "";
        this.key = "";
    }

    set(values){
        this.id = values.id;
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