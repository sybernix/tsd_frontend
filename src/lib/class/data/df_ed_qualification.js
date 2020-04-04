class df_ed_qualification {
    constructor(){
        this.id = "";
        this.qualification = "";
        this.sort_order = 0;
    }

    set(values){
        this.id = values.id;
        this.qualification = values.qualification;
        this.sort_order = values.sort_order;
    }
}

export default df_ed_qualification;