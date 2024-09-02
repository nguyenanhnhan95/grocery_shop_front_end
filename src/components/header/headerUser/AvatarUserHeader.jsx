import { memo } from "react";
import { useSelector } from "react-redux";
import logoAvatarUser from "../../../assets/img/header/logo_user_default.jpg"
function AvatarUserHeader(props) {
    const { handleHeaderUserClick } = props;
    const {  authenticate, srcAvatar,errorAvatar } = useSelector((state) => state.profile)
    return (
        <>
            {authenticate === true && (
                <div className="header-user-item" onClick={handleHeaderUserClick}>
                    <img src={(srcAvatar === null || errorAvatar !==null) ? logoAvatarUser : srcAvatar} alt="" />
                </div>

            )
            }
        </>
    )
}
export default memo(AvatarUserHeader);