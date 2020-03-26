import m_teacher from "./m_teacher";
import m_class from "./m_class";

class rel_teacher_class {
    constructor() {
        this.id = "";
        this.teacher_id = "";
        this.class_id = "";
        this.start_date = new Date();
        this.end_date = null;

        this.__teacher = new m_teacher();
        this.__class = new m_class();
    }

    set(values) {
        this.id = values.id;
        this.teacher_id = values.teacher_id;
        this.class_id = values.class_id;
        this.start_date = values.start_date;
        this.end_date = values.end_date;

        this.__teacher = values.__teacher;;
        this.__class = values.__class;
    }
}

export default rel_teacher_class;