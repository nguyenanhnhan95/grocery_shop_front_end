import { memo } from "react";
import InformationUserModel from "./InformationUserModel";
import RedirectAdminHeader from "./RedirectAdminHeader";
import DarkUserModel from "./DarkUserModel";
import LogoutUser from "./LogoutUser";

function HeaderUserModel(props) {
    const { isModalUserVisible, headerUserModalRef, headerUserRef,handleCloseHeaderModel } = props;
    
    return (
        <div className="header-user-modal" style={{ display: isModalUserVisible ? 'block' : 'none' }} ref={headerUserModalRef}>
            <InformationUserModel headerUserRef={headerUserRef} />
            <hr />
            <div className="header-user-modal-item"><i className="fa-solid fa-user-gear"></i>Cập nhập tài khoản</div>
            <DarkUserModel />
            <RedirectAdminHeader />
            <LogoutUser handleCloseHeaderModel={handleCloseHeaderModel}/>
        </div>
    )
}
export default memo(HeaderUserModel)