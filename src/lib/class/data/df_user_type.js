class df_user_type{
    constructor(params = null) {
        if(params == null) {
            this.id = "";
            this.type_name = ""; //['user', 'teacher', 'parent', 'student']
            this.type = ""; //[u, t, p, s]
        } else {
            this.set(params);
        }
    }

    set(values){
        this.id = values.id;
        this.type_name = values.type_name;
        this.type = values.type_name;
    }
}

export default df_user_type;