import LogoSky from "../../../assets/img/header/logo-sky.png"
import "../../../assets/css/loading/home/loadingHeader.css"
function LoadingHeader() {
    return (
        <div className="header">
            <div className="container-fluid container-header ">
                <div className="d-flex  header-mb-container navbar-collapse">
                    <div className="header-item-mob">
                        <ul className="nav">
                            <li className="nav-item pl-1" >
                                <i className="fa-solid fa-bars "></i>
                            </li>
                        </ul>
                    </div>
                    <div className="header-menu-pc">
                        <div className="header-logo header-item">
                            <img src={LogoSky} alt="" />
                        </div>
                        <div className="drop-menu header-item ">
                        </div>
                    </div>
                    <div className="header-search-mob">
                        <div className="header-search-input d-flex align-items-center">
                            <input className="header-search-input-enter form-control" />
                            <div className="header-search-input-press">
                                <i className="fa-solid fa-magnifying-glass" />
                            </div>
                        </div>
                    </div>
                    <ul className="navbar-nav ">
                        <li className="nav-item ">
                            <div className="nav-item-load"></div>
                        </li>
                        <li className="nav-item ">
                            <div className="nav-item-load"></div>
                        </li>
                        <li className="nav-item ">
                            <div className="nav-item-load"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default LoadingHeader;