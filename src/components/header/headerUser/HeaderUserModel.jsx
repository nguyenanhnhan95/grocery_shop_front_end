import { memo } from "react";
import InformationUserModel from "./InformationUserModel";
import RedirectAdminHeader from "./RedirectAdminHeader";
import DarkUserModel from "./DarkUserModel";
import { CONST_LOGIN, PROVIDER_ID, USER_LOGIN } from "../../../utils/commonConstants";
import { handleRedirectLogout } from "../../../utils/commonUtils";

function HeaderUserModel(props) {
    const { isModalUserVisible, headerUserModalRef, headerUserRef } = props;
    const handleLogout = () => {
        handleRedirectLogout()
        localStorage.removeItem(CONST_LOGIN.ACCESS_TOKEN);
        localStorage.removeItem(PROVIDER_ID);
        localStorage.removeItem(USER_LOGIN);
    }
    return (
        <div className="header-user-modal" style={{ display: isModalUserVisible ? 'block' : 'none' }} ref={headerUserModalRef}>
            <InformationUserModel headerUserRef={headerUserRef} />
            <hr />
            <div className="header-user-modal-item"><i className="fa-solid fa-user-gear"></i>Cập nhập tài khoản</div>
            <DarkUserModel />
            <RedirectAdminHeader />
            <div className="header-user-modal-item" onClick={handleLogout}><i className="fa-solid fa-power-off"></i>Đăng xuất</div>
        </div>
    )
}
export default memo(HeaderUserModel)