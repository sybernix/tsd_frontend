import m_student from "./m_student";
import m_class from "./m_class";

class rel_student_class {
    constructor(){
        this.id = "";
        this.student_id = "";
        this.class_id = "";
        this.reg_date = new Date();
        this.end_date = null;

        this.__student = new m_student();
        this.__class = new m_class();
    }

    set(values) {
        this.id = values.id;
        this.student_id = values.student_id;
        this.class_id = values.class_id;
        this.reg_date = values.reg_date;
        this.end_date = values.end_date;

        this.__student = values.__student;
        this.__class = values.__class;
    }
}

export default rel_student_class;