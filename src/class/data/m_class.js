class m_class{
    constructor() {
        this.id = "";
        this.class_name = "";
        this.class_section_id = "";
    }

    set(values){
        this.id = values.id;
        this.class_name = values.class_name;
        this.class_section_id = values.class_section_id;
    }
}

export default m_class;