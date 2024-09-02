import { useDispatch } from "react-redux";
import { useFetchGet } from "../fetch/authenticated/useFetchGet";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { NOT_PERMISSION_PAGE } from "../../utils/commonConstants";
import { actionCloseNotificationModal, actionShowNotificationModal } from "../../redux/action/modal/actionNotificationModal";
import { handleNotificationModal } from "../../redux/slice/modal/notificationModal";
import { createActionURL } from "../../utils/commonUtils";
import LoadingPage from "../../components/loading/LoadingPage";

export const useAuthorizePage = (allowRoles) => {
    const { fetchGet, data, isPending, error, code } = useFetchGet();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkAuthorize, setCheckAuthorize] = useState(false);
    const [authorize, setAuthorize] = useState(null);
    const notifyNotAuthorized = useCallback(() => {
        dispatch(handleNotificationModal(actionShowNotificationModal(NOT_PERMISSION_PAGE)));
        setAuthorize(false);
        const timeoutId = setTimeout(() => {
            dispatch(handleNotificationModal(actionCloseNotificationModal()))
            navigate("/");
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [dispatch, navigate]);
    useEffect(() => {
        fetchGet(createActionURL("auth/role").instant())
    }, [fetchGet])
    useEffect(() => {
        if (code === 200 && data) {
            setCheckAuthorize(true)
            let flag = false;
            for (const allow of allowRoles) {
                if (data.includes(allow)) {
                    flag = true;
                    setAuthorize(true)
                    break;
                }
            }
            if (!flag) {
                notifyNotAuthorized()
            }
            setCheckAuthorize(false);
        }
    }, [code])
    useEffect(() => {
        if (error !== null ) {
            notifyNotAuthorized()
        }
    }, [error])
    if (isPending || checkAuthorize) {
        return <LoadingPage />
    }
    return { authorize }
}