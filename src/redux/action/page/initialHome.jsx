import { keyStateAdmin } from "../../slice/manageState/adminState"


export const actionInitialHome=(data)=>{
    return{
        type: keyStateAdmin.INITIAL_HOME,
        payload:data
    }
}