
import { actionShowNotificationModal } from "../redux/action/modal/actionNotificationModal";
import { handleNotificationModal } from "../redux/slice/modal/notificationModal";
import { fetchProfileSlice } from "../redux/slice/person/profile";
import { LOGIN_SESSION_EXPIRE_DATE } from "../utils/commonConstants";
import { handleRedirectHome, handleRedirectLogIn } from "../utils/commonUtils";

export const handleAuthenticateException = async (props) => {
    const { code, dispatch } = props;
    console.log(code)
    switch (code) {
        case 403:
            handleRedirectHome()
            break;
        case 4006:
            // handleRedirectLogIn()
            break;
        case 4007:
            dispatch(handleNotificationModal(actionShowNotificationModal(LOGIN_SESSION_EXPIRE_DATE)));
            setTimeout(() => {
                handleRedirectLogIn()
            }, 3000)
            break;
        default:
        // handleRedirectLogIn()
    }
}
