import df_access_level from './df_access_level';
import df_title from "./df_title";

class m_contact{
    constructor(){
        this.id = "";
        this.nic = "";
        this.passport = "";
        this.title_id = "";
        this.first_name = "";
        this.middle_name = "";
        this.last_name = "";
        this.sex = "";
        this.dob = new Date();
        this.phone = "";
        this.password = "";
        this.access_level_id = "";

        this.__title = new df_title();
        this.__access_level = new df_access_level();
    }

    set(values) {
        this.id = values.id;
        this.nic = values.nic;
        this.owner_id = values.owner_id;
        this.user_type_id = values.user_type_id;
        this.passport = values.passport;
        this.title_id = values.title_id;
        this.first_name = values.first_name;
        this.middle_name = values.middle_name;
        this.last_name = values.last_name;
        this.sex = values.sex;
        this.dob = values.dob;
        this.phone = values.phone;
        this.password = values.password;
        this.access_level_id = values.access_level_id;

        this.__title = values.__title;
        this.__access_level = values.__access_level;
    }
}

export default m_contact;