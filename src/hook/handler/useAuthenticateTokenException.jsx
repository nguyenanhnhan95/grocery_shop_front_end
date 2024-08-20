import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { handleRedirectHome, handleRedirectLogIn } from "../../utils/commonUtils";
import { handleNotificationModal } from "../../redux/slice/modal/notificationModal";
import { actionShowNotificationModal } from "../../redux/action/modal/actionNotificationModal";
import { handleTokenRefresh } from "../../handler/handlerException";

export const useAuthenticateTokenException=()=>{
    const dispatch = useDispatch();

    const handleAuthenticateException = useCallback(async ({ code, error,  message,handleService,args}) => {
        switch (code) {
            case 403:
                handleRedirectHome();
                break;
            case 4006:
                // handleRedirectLogIn()
                break;
            case 4007:
                dispatch(handleNotificationModal(actionShowNotificationModal(LOGIN_SESSION_EXPIRE_DATE)));
                setTimeout(() => {
                    handleRedirectLogIn();
                }, 3000);
                break;
            case 4008:
                await handleTokenRefresh({ dispatch, handleService });
                break;
            default:
                // handleRedirectLogIn()
        }
    }, [dispatch]);

    return { handleAuthenticateException };
}