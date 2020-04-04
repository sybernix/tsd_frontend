class df_user_type{
    constructor() {
        this.id = "";
        this.type_name = ""; //['user', 'teacher', 'parent', 'student']
        this.type = ""; //[u, t, p, s]
    }

    set(values){
        this.id = values.id;
        this.type_name = valus.type_name;
        this.type = values.type_name;
    }
}

export default df_user_type;