import { memo } from "react";
import { useSelector } from "react-redux";
import { LINK_USER } from "../../utils/commonConstants";
function RedirectLogin() {
    const { authenticate } = useSelector((state) => state.profile)
    const handleRedirectLogIn = () => {
        window.location.href = LINK_USER.linkLogin;
    }
    return (
        <>
            {
                authenticate === false && (
                    <div className="header-user-login" onClick={() => handleRedirectLogIn()} >Đăng nhập</div>
                )
            }
        </>
    )
}
export default memo(RedirectLogin);