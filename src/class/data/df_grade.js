class df_grade {
    constructor() {
        this.id = "";
        this.min_marks = 0;
        this.max_marks = 0;
        this.section_id = 0;
        this.grade = "";
    }

    set(values) {
        this.id = values.id;
        this.min_marks = values.min_marks;
        this.max_marks = values.max_marks;
        this.section_id = values.section_id;
        this.grade = values.grade;
    }
}

export default df_grade;