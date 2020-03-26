import m_extra_activity from "./m_extra_activity";
import m_student from "./m_student"

class rel_student_activity {
    constructor() {
        this.id = "";
        this.extra_activity_id = "";
        this.student_id = "";
        this.joined_date = new Date();
        this.leave_date = null;

        this.__extra_activity = new m_extra_activity();
        this.__student = new m_student();
    }

    set(values){
        this.id = values.id;
        this.extra_activity_id = values.extra_activity_id;
        this.student_id = values.student_id;
        this.joined_date = values.joined_date;
        this.leave_date = values.leave_date;

        this.__extra_activity = values.__extra_activity;
        this.__student = values.__student;
    }
}

export default rel_student_activity;