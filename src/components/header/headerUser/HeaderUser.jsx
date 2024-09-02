import { memo, useCallback, useEffect, useRef, useState } from "react";
import "../../../assets/css/header/headerUser/headerUser.css"
import AvatarUserHeader from "./AvatarUserHeader";
import HeaderUserModel from "./HeaderUserModel";
import RedirectLogin from "../../login/RedirectLogin";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileSlice, updateSrcAvatar } from "../../../redux/slice/person/profile";
import { FETCH_PROFILE } from "../../../redux/action/person/person";
import { useFetchUrlImage } from "../../../hook/fetch/aws/useFetchUrlImage";
function HeaderUser() {
    const [isModalUserVisible, setIsModalUserVisible] = useState(false);
    const headerUserRef = useRef(null);
    const headerUserModalRef = useRef(null);
    const dispatch = useDispatch();
    const { srcAvatar, profile, status, error } = useSelector(state => state.profile)
    const { fetchUrlImage, data, isPending } = useFetchUrlImage();
    useEffect(() => {
        if (status === FETCH_PROFILE.FETCH_PROFILE_INITIAL) {
            dispatch(fetchProfileSlice());
        }
    }, [status, dispatch])
    useEffect(() => {
        if (srcAvatar === null && profile !== null) {
            fetchUrlImage(profile.avatar)
        }
    }, [srcAvatar, profile])
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
    }, [headerUserRef]);

    const handleHeaderUserClick = useCallback(() => {
        if (isModalUserVisible) {
            headerUserModalRef.current.style.display = 'none';
            setIsModalUserVisible(false);
        } else {
            headerUserModalRef.current.style.display = 'block';
            setIsModalUserVisible(true);
        }
    }, [headerUserModalRef, isModalUserVisible]);
    // const handleCloseHeaderModel = useCallback(() => {
    //     // headerUserModalRef.current.style.display = 'none';
    // }, [headerUserModalRef])
    return (
        <li className={`nav-item  header-user ${isPending || status === FETCH_PROFILE.FETCH_PROFILE_LOADING && 'loading-information-user'}`} ref={headerUserRef} >
            <AvatarUserHeader handleHeaderUserClick={handleHeaderUserClick} />
            <RedirectLogin />
            <HeaderUserModel headerUserModalRef={headerUserModalRef} isModalUserVisible={isModalUserVisible} />
        </li>
    )
}
export default memo(HeaderUser);