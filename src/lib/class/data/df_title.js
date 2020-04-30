class df_title{
    constructor(params = null) {
        if(params == null) {
            this.id = "";
            this.title = "";
        } else {
            this.set(params);
        }
    }

    set(values){
        this.id = values.id;
        this.title = values.title;
    }
}

export default df_title;