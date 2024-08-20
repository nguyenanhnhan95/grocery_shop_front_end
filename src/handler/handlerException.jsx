import { actionShowNotificationModal } from "../redux/action/modal/actionNotificationModal";
import { fetchRefreshToken } from "../redux/slice/auth/authentication";
import { handleNotificationModal } from "../redux/slice/modal/notificationModal";
import { fetchProfileSlice } from "../redux/slice/person/profile";
import { CONST_LOGIN, LOGIN_SESSION_EXPIRE_DATE } from "../utils/commonConstants";
import { handleRedirectHome, handleRedirectLogIn } from "../utils/commonUtils";

export const handleAuthenticateException = async (props) => {
    const { code, error, dispatch, message } = props;
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
        case 4008:
            try {
                const response= await dispatch(fetchRefreshToken()).unwrap();
                console.log(response)
                if(response?.code===200){
                    dispatch(fetchProfileSlice());
                }
                 // Gọi lại fetchProfileSlice sau khi refresh token
            } catch (refreshError) {
                dispatch(handleNotificationModal(actionShowNotificationModal(LOGIN_SESSION_EXPIRE_DATE)));
                setTimeout(() => {
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
            handleRedirectLogIn();
        }, 3000);
        return Promise.reject(error);
    }
};
export const handleTokenRefresh = async ({ dispatch, handleService }) => {
    try {
      const response = await dispatch(fetchRefreshToken()).unwrap();
      if (response?.code === 200) {
        handleService(); // Retry the original service
      }
    } catch (refreshError) {
      dispatch(handleNotificationModal(actionShowNotificationModal(LOGIN_SESSION_EXPIRE_DATE)));
      setTimeout(() => {
        handleRedirectLogIn(); // Redirect to login after token refresh failure
      }, 3000);
    }
  };