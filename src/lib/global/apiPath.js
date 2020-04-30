const baseAddress = "http://35.222.65.6:4000/";

export const ApiBase = {
    LOGIN_API: baseAddress + "login",
    VALIDATE_API: baseAddress + "login/verifyToken"
}

export class ApiClassPath
{
    constructor(className) 
    {
        this.RETRIEVE_API = baseAddress + className + "/retrieve/";
    }    
}
