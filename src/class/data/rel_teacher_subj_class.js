import m_teacher from "./m_teacher"
import df_subject from "./df_subject"
import m_class from "./m_class"

class rel_teacher_subj_class {
    constructor() {
        this.id = "";
        this.teacher_id = "";
        this.subject_id = "";
        this.class_id = "";
        this.start_date = new Date();
        this.end_date = null;

        this.__teacher = new m_teacher();
        this.__subject = new df_subject();
        this.__class = new m_class();
    }
}

export default rel_teacher_subj_class;