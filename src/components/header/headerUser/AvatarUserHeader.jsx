import { memo } from "react";
import { useSelector } from "react-redux";
import logoAvatarUser from "../../../assets/img/header/logo_user_default.jpg"
function AvatarUserHeader(props) {
    const { handleHeaderUserClick } = props;
    const { profile, authenticate } = useSelector((state) => state.profile)
    console.log(profile)
    return (
        <>
            {authenticate === true && (
                <div className="header-user-item" onClick={handleHeaderUserClick}>
                    {profile?.avatar === null ? (
                        <img src={logoAvatarUser} alt="" />
                    ) : (
                        <img src={profile?.avatar} alt="" />
                    )}
                </div>

            )
            }
        </>
    )
}
export default memo(AvatarUserHeader);