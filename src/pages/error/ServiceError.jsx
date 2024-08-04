
import { useNavigate, useRouteError } from "react-router-dom";
import "../../assets/css/error/serviceError.css"
import { GO_BACK, GO_BACK_HOME } from "../../utils/commonConstants";
import backGroupError from "../../assets/img/error/error-service.jpg"
import { handleRedirectHome } from "../../utils/commonUtils";
function ServiceError() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.log(error)
    return (
        <div className="service-error">
            <div className="service-error-background">
                <img src={backGroupError} alt="" />
            </div>
            <div className="service-error-content">
                <div className="service-error-title">
                    {error}
                </div>
                <div className="service-error-redirect">
                    <button className="service-error-redirect-back" onClick={()=>navigate(-1)}>
                        <i className="fa-solid fa-arrow-left"></i>
                        {GO_BACK}
                    </button>
                    <button className="service-error-redirect-home" onClick={()=>handleRedirectHome()}>
                        <i className="fa-solid fa-house"></i>
                        {GO_BACK_HOME}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ServiceError;