import { CLOSE, SHOW } from "../../../utils/commonConstants"

export const actionShowNotificationModal=(data)=>{
    return{
        type :SHOW,
        message:data,
    }
}
export const actionCloseNotificationModal=()=>{
    return{
        type:CLOSE
    }
}