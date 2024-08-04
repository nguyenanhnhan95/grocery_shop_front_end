import { actionShowNotificationModal } from "../redux/action/modal/actionNotificationModal";
import { fetchRefreshToken } from "../redux/slice/auth/authentication";
import { handleNotificationModal } from "../redux/slice/modal/notificationModal";
import { fetchProfileSlice } from "../redux/slice/person/profile";
import { CONST_LOGIN,  LOGIN_SESSION_EXPIRE_DATE } from "../utils/commonConstants";
import { checkToken, getToken, handleRedirectHome, handleRedirectLogIn } from "../utils/commonUtils";

export const handleProfileException = async (props) => {
    const { code, error, dispatch, message } = props;
    switch (code) {
        case 403:
            handleRedirectHome()
            break;
        case 4006:
            handleRedirectLogIn()
            break;
        case 4007:
            dispatch(handleNotificationModal(actionShowNotificationModal(LOGIN_SESSION_EXPIRE_DATE)));
            setTimeout(() => {
                localStorage.removeItem(CONST_LOGIN.ACCESS_TOKEN);
                handleRedirectLogIn()
            }, 3000)

            break;
        case 4008:
            try {
                await dispatch(fetchRefreshToken()).unwrap(); // Đợi refresh token thành công
                if (checkToken(getToken())) {
                    dispatch(fetchProfileSlice()); // Gọi lại fetchProfileSlice sau khi refresh token
                }
            } catch (refreshError) {
                dispatch(handleNotificationModal(actionShowNotificationModal(LOGIN_SESSION_EXPIRE_DATE)));
                setTimeout(() => {
                    localStorage.removeItem(CONST_LOGIN.ACCESS_TOKEN);
                    handleRedirectLogIn()
                }, 3000)
            }
            break;
        default:
        // handleRedirectLogIn()
    }
}
export const handleServiceRefreshToken = async ({ handleService, dispatch, args }) => {
    try {
        await dispatch(fetchRefreshToken()).unwrap(); // Ensure the token is refreshed
        return dispatch(handleService(args)); // Re-dispatch the original action with its arguments
    } catch (error) {
        dispatch(handleNotificationModal(actionShowNotificationModal(LOGIN_SESSION_EXPIRE_DATE)));
        setTimeout(() => {
            localStorage.removeItem(CONST_LOGIN.ACCESS_TOKEN);
            handleRedirectLogIn();
        }, 3000);
        return Promise.reject(error);
    }
};