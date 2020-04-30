class df_marital_status {
    constructor(params = null) {
        if(params == null) {
            this.id = "";
            this.status = "";
        }
        else this.set(params);
    }

    set(values){
        this.id = values.id;
        this.status = values.status;
    }
}

export default df_marital_status;