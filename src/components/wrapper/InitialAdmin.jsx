import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect, useState } from "react";
import { getToken, } from "../../utils/commonUtils";

import LoadingPage from "../loading/LoadingPage";
import { fetchProfileSlice } from "../../redux/slice/person/profile";
import { FETCH_PROFILE } from "../../redux/action/person/person";
import { NOT_PERMISSION_PAGE, ROLES, TYPE_STRING } from "../../utils/commonConstants";
import { useAccessAdminPage } from "../../hook/loader/admin/useAccessAdminPage";
import { useNavigate } from "react-router-dom";
import { handleNotificationModal } from "../../redux/slice/modal/notificationModal";
import { actionShowNotificationModal } from "../../redux/action/modal/actionNotificationModal";

function InitialAdmin({ children }) {
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.profile);
    const navigate = useNavigate();
    const authorizedRoles = [ROLES.ROLE_ADMIN, ROLES.ROLE_EMPLOYEE, ROLES.ROLE_MANAGER];
    const isAuthorized = useAccessAdminPage(authorizedRoles)
    const handleAuthorized = useCallback(() => {
        dispatch(handleNotificationModal(actionShowNotificationModal(NOT_PERMISSION_PAGE)));
        const timeoutId = setTimeout(() => {
            navigate(-1);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [dispatch, navigate]);

    useEffect(() => {
        if (typeof getToken() === TYPE_STRING && getToken().length > 0) {
            if (status === FETCH_PROFILE.FETCH_PROFILE_INITIAL) {
                dispatch(fetchProfileSlice());
            }
        } else {
            handleAuthorized();
        }
    }, [status, dispatch, handleAuthorized]);
    const handleApiComplete = () => {
        return (status === FETCH_PROFILE.FETCH_PROFILE_SUCCESS && isAuthorized);
    };
    return (
        < >
            {status === FETCH_PROFILE.FETCH_PROFILE_LOADING && (
                <LoadingPage />
            )}
            {handleApiComplete() && (
                <div>
                    {children}
                </div>
            )}
        </>
    )
}
export default memo(InitialAdmin)