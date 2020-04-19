import m_contact from './m_contact'

class m_admin extends m_contact {
    constructor() {
        super();
        this.id = "";        
        this.is_active = "";
    }

    set(values){
        super.set(this);
        this.id = "";
        this.is_active = values.active;
    }
}

export default m_admin;