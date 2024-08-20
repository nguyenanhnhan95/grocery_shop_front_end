import { memo, useCallback, useEffect, useRef, useState } from "react";
import "../../../assets/css/header/headerUser/headerUser.css"
import AvatarUserHeader from "./AvatarUserHeader";
import HeaderUserModel from "./HeaderUserModel";
import RedirectLogin from "../../login/RedirectLogin";
import { useFetchFile } from "../../../hook/fetch/aws/useFetchFile";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileSlice, updateSrcAvatar } from "../../../redux/slice/person/profile";
import { FETCH_PROFILE } from "../../../redux/action/person/person";
import { handleTokenRefresh } from "../../../handler/handlerException";
function HeaderUser() {
    const [isModalUserVisible, setIsModalUserVisible] = useState(false);
    const headerUserRef = useRef(null);
    const headerUserModalRef = useRef(null);
    const dispatch = useDispatch();
    const { srcAvatar, profile, status, error } = useSelector(state => state.profile)
    const { fetchFile, data, isPending } = useFetchFile();
    useEffect(() => {
        if (status === FETCH_PROFILE.FETCH_PROFILE_INITIAL) {
            dispatch(fetchProfileSlice());
        }
    }, [status, dispatch])
    useEffect(() => {
        if (srcAvatar === null && profile !== null) {
            fetchFile(profile.avatar)
        }
    }, [srcAvatar, profile])
    useEffect(() => {
        const handleErrorRefresh = async () => {
            await handleTokenRefresh({
                dispatch,
                handleService: () => dispatch(fetchProfileSlice())
            });
        };
        if (error?.response?.data?.status === 4008) {
            handleErrorRefresh(); // Call the async function within the useEffect
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (data != null) {
            dispatch(updateSrcAvatar({ srcAvatar: data, error: error }))
        }
    }, [data])
    useEffect(() => {
        function handleClickOutside(event) {
            if (headerUserRef.current && !headerUserRef.current.contains(event.target)) {
                setIsModalUserVisible(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleHeaderUserClick = useCallback(() => {
        if (isModalUserVisible) {
            headerUserModalRef.current.style.display = 'none';
            setIsModalUserVisible(false);
        } else {
            headerUserModalRef.current.style.display = 'block';
            setIsModalUserVisible(true);
        }
    }, [headerUserModalRef, isModalUserVisible]);
    const handleCloseHeaderModel = useCallback(() => {
        headerUserModalRef.current.style.display = 'none';
    }, [headerUserModalRef])
    return (
        <li className={`nav-item  header-user ${isPending || status === FETCH_PROFILE.FETCH_PROFILE_LOADING && 'loading-information-user'}`} ref={headerUserRef} >
            <AvatarUserHeader handleHeaderUserClick={handleHeaderUserClick} />
            <RedirectLogin />
            <HeaderUserModel handleCloseHeaderModel={handleCloseHeaderModel} headerUserModalRef={headerUserModalRef} headerUserRef={headerUserRef} />
        </li>
    )
}
export default memo(HeaderUser);