import { memo } from "react"
import { useSelector } from "react-redux"
import logoAvatarUser from "../../../assets/img/header/logo_user_default.jpg"
function InformationUserModel() {
    const { profile } = useSelector((state) => state.profile)
    return (
        <div className="d-flex justify-content-start header-user-modal-item">
            <div className="header-user-modal-item-image">
                {profile?.avatar === null ? (
                    <img src={logoAvatarUser} alt="" />
                ) : (
                    <img src={profile?.avatar} alt="" />
                )}
            </div>
            <div className=" header-user-modal-item-name">
                {profile?.name}
            </div>
        </div>
    )
}
export default memo(InformationUserModel)