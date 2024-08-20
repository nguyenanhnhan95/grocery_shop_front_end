import { memo } from "react"
import { useSelector } from "react-redux"
import logoAvatarUser from "../../../assets/img/header/logo_user_default.jpg"
function InformationUserModel() {
    const { profile, srcAvatar, errorAvatar } = useSelector((state) => state.profile)
    return (
        <div className="d-flex justify-content-start header-user-modal-item">
            <div className="header-user-modal-item-image">
                <img src={srcAvatar === null || errorAvatar !== null ? logoAvatarUser : srcAvatar} alt="" />
            </div>
            <div className=" header-user-modal-item-name">
                {profile?.name}
            </div>
        </div>
    )
}
export default memo(InformationUserModel)