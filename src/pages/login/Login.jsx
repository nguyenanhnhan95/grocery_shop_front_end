import "../../assets/css/login/login.css"
import LoginForm from "../../components/login/LoginForm";
import SocialLogin from "../../components/login/SocialLogin";
import BackgroundImg from "../../assets/img/login/background_img_login.jpg"
import logo from "../../assets/img/header/logo-sky.png"
import BackgroundImgDark from "../../assets/img/login/background_img_login_dark.jpg"
import { memo, useEffect } from "react";
import { getScreenThem } from "../../utils/commonUtils";
import { SCREEN_THEME_MODE } from "../../utils/commonConstants";
import { useAuthenticatePage } from "../../hook/auth/useAuthenticatePage";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { authenticate, checkAuthenticate } = useAuthenticatePage();
  useEffect(() => {
    if (checkAuthenticate && authenticate) {
      navigate("/");
    }
  }, [checkAuthenticate, authenticate])
  if (authenticate === false) {
    return (
      <div className="container-fluid login">
        <div className="login-logo">
          <img src={logo} alt="" />
        </div>
        <div className="login-content">
          <div className=" loin-img">
            {getScreenThem() === SCREEN_THEME_MODE.SCREEN_DARK.alias ? (
              <img src={BackgroundImgDark} alt="" />
            ) : (<img src={BackgroundImg} alt="" />)}
          </div>
          <div className="  justify-content-center login-form">
            <div className="card card-login">
              <div className="card-header">
                <div className="card-header-title">
                  Đăng nhập
                </div>
              </div>
              <div className="card-body">
                <LoginForm />
                <div className="separator mb-3">Hoặc</div>
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export default memo(Login);