class df_relation_type {
    constructor(){
        this.id = "";
        this.relation = "";
        this.is_parent = false;
    }

    set(valus){
        this.id = valus.id;
        this.relation = valus.relation;
        this.is_parent = valus.is_parent;
    }
}

export default df_relation_type;