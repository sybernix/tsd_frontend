import m_parent from "./m_parent"
import m_student from './m_student'
import df_relation_type from "./df_relation_type";

class rel_parent_student {
    constructor() {
        this.id = "";
        this.parent_id = "";
        this.student_id = "";
        this.relation_type_id = "";

        this.__parent = new m_parent();
        this.__student = new m_student();
        this.__relation_type = new df_relation_type();
    }

    set(values){
        this.id = values.id;
        this.parent_id = values.parent_id;
        this.student_id = values.student_id;
        this.relation_type_id = values.relation_type_id;

        this.__parent = values.__parent;
        this.__student = values.__student;
        this.__relation_type = values.__relation_type;
    }
}

export default rel_parent_student;