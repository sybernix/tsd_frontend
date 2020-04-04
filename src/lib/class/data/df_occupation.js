class df_occupation {
    constructor() {
        this.id = "";
        this.occupation_category_id = "";
        this.occupation = "";
    }

    set(values){
        this.id = values.id;
        this.occupation_category_id = values.occupation_category_id;
        this.occupation = values.occupation;
    }
}

export default df_occupation;