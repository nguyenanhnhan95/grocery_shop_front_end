import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react";

import { FETCH_PROFILE } from "../../../redux/action/person/person";
import { useNavigate } from "react-router-dom";
import { handleNotificationModal } from "../../../redux/slice/modal/notificationModal";
import { actionShowNotificationModal } from "../../../redux/action/modal/actionNotificationModal";
import { NOT_PERMISSION_PAGE } from "../../../utils/commonConstants";

export const useAccessAdminPage = (permissionRoles) => {
    const { roles, status } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(roles)
    const isAuthorized = useMemo(() => {
        if (status === FETCH_PROFILE.FETCH_PROFILE_SUCCESS) {
            return roles.some(role => permissionRoles.includes(role));
        }
        return null;
    }, [roles, permissionRoles, status]);

    useEffect(() => {
        if (isAuthorized === false) {
            dispatch(handleNotificationModal(actionShowNotificationModal(NOT_PERMISSION_PAGE)));
            const timeoutId = setTimeout(() => {
                navigate(-1);
            }, 5000);

            // Clean up the timeout if the effect is re-run or component is unmounted
            return () => clearTimeout(timeoutId);
        }
    }, [isAuthorized, status, dispatch, navigate]);

    return isAuthorized;

};