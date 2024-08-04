import { memo, useCallback, useEffect, useRef, useState } from "react";
import "../../../assets/css/header/headerUser/headerUser.css"
import AvatarUserHeader from "./AvatarUserHeader";
import HeaderUserModel from "./HeaderUserModel";
import RedirectLogin from "../../login/RedirectLogin";
function HeaderUser() {
    const [isModalUserVisible, setIsModalUserVisible] = useState(false);
    const headerUserRef = useRef(null);
    const headerUserModalRef = useRef(null);
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
    return (
        <li className="nav-item  header-user" ref={headerUserRef} >
            <AvatarUserHeader handleHeaderUserClick={handleHeaderUserClick} />
            <RedirectLogin />
            <HeaderUserModel isModalUserVisible={isModalUserVisible} headerUserModalRef={headerUserModalRef} headerUserRef={headerUserRef} />
        </li>
    )
}
export default memo(HeaderUser);