import df_ed_qualification from "./df_ed_qualification"
import df_ed_speciality from "./df_ed_speciality"
import df_institute from "./df_institute"
import m_teacher from "./m_teacher";

class rel_teacher_qualification {
    constructor() {
        this.id = "";
        this.teacher_id = "";
        this.ed_qualification_id = "";
        this.ed_spacility_id = "";
        this.Institute_id = "";
        this.reference_no = "";
        this.started_date = null;
        this.finished_date = null;
        this.completed = false;

        this.__teacher = new m_teacher();
        this.__institute = new df_institute();
        this.__ed_qualification = new df_ed_qualification();
        this.__ed_speciality = new df_ed_speciality();
    }

    set(values) {
        this.id = values.id;
        this.teacher_id = values.teacher_id;
        this.ed_qualification_id = values.ed_qualification_id;
        this.ed_spacility_id = values.ed_spacility_id;
        this.Institute_id = values.Institute_id;
        this.reference_no = values.reference_no;
        this.started_date = values.started_date;
        this.finished_date = values.finished_date;
        this.completed = values.completed;

        this.__teacher = values.__teacher;
        this.__institute = values.__institute;
        this.__ed_qualification = values.__ed_qualification;
        this.__ed_speciality = values.__ed_speciality;
    }
}

export default rel_teacher_qualification;