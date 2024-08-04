import { Link } from "react-router-dom";
import "../../../assets/css/admin/header/headerAdmin.css"
import { memo, useRef, useState } from "react";
import HeaderUser from "../../header/headerUser/HeaderUser";
import HeaderNotification from "../../header/headerNotification/HeaderNotification";
import SearchHeaderAdminMB from "./searchHeaderAdmin/SearchHeaderAdminMB";
import SearchHeaderAdminPC from "./searchHeaderAdmin/SearchHeaderAdminPC";
import OverPlayMenuAdmin from "./overPlayMenuAdmin/OverPlayMenuAdmin";
import OverSearchAdminMB from "./overSearchAdminMB/OverSearchAdminMB";
function HeaderAdmin() {
    const [overSearchMB, setOverSearchMB] = useState(false);
    const refClickSearchMB = useRef(null)
    return (
        <>
            <div className="navbar navbar-expand-lg header-main navbar-light">
                <div className={`container-fluid container-header-main ${overSearchMB ? ('mb') : 'pc'}`}>
                    <div className="main-content-header-left">
                        <div className=" navbar-collapse">
                            <ul className="navbar-nav ">
                                <OverPlayMenuAdmin />
                                < SearchHeaderAdminPC />
                                <SearchHeaderAdminMB setOverSearchMB={setOverSearchMB} refClickSearchMB={refClickSearchMB} />
                            </ul>
                        </div>
                    </div>

                    <div className="main-content-header-right">
                        <div className=" navbar-collapse">
                            <ul className="navbar-nav ">
                                <Link to={`/`}>
                                    <li className="nav-item turn-home">
                                        <i className="fa-solid fa-up-right-from-square " />
                                    </li>
                                </Link>
                                <HeaderNotification />
                                <HeaderUser />
                            </ul>
                        </div>
                    </div>
                    <OverSearchAdminMB setOverSearchMB={setOverSearchMB} refClickSearchMB={refClickSearchMB} />
                </div>
            </div>
            <div className="header-navbar-shadow"></div>
        </>
    )
}
export default memo(HeaderAdmin);