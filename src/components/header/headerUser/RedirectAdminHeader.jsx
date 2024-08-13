import { memo } from "react"
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROLES } from "../../../utils/commonConstants";

function RedirectAdminHeader() {
    const { profile } = useSelector((state) => state.profile)
    const location = useLocation();
    const navigate = useNavigate()
    const handleCheckLocation = () => {
        try{
            let size = profile.roles.length;
            for (let i = 0; i < size; ++i) {
                if (profile.roles[i] === ROLES.ROLE_USER || location.pathname.substring(0, 6) === "/admin") {
                    return false;
                }
            }
            return true;
        }catch(error){
            return false;
        }  
    }
    return (
        <>
            {handleCheckLocation() && (
                <div className="header-user-modal-item" onClick={() => navigate("/admin")}>
                    <i className="fa-solid fa-users"></i>Quản lý nhân sự
                </div>
            )}
        </>
    )
}
export default memo(RedirectAdminHeader)