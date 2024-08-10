import logo_google from "../../assets/img/header/logo_google.png"
import logo_facebook from "../../assets/img/header/logo_facebook.png"
import { Link } from "react-router-dom";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../utils/commonConstants";
function SocialLogin() {
    return (
        <div className="submit-social d-flex align-items-center justify-content-around">
            <Link to={GOOGLE_AUTH_URL}><img src={logo_google} alt=""  className="mr-2" /></Link>
            <Link to={FACEBOOK_AUTH_URL}  ><img src={logo_facebook} alt="" className="ml-2" /></Link>
        </div>
    )
}
export default SocialLogin;