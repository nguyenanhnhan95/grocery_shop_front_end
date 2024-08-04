import { memo, useEffect } from "react";
import "../../assets/css/header/header.css"
import { useDispatch } from "react-redux";
import HeaderMenusMB from "./headerResponsive/HeaderMenusMB";
import HeaderMenusPc from "./headerResponsive/HeaderMenusPC";
import HeaderCart from "./headerCart/HeaderCart";
import HeaderNotification from "./headerNotification/HeaderNotification";
import HeaderUser from "./headerUser/HeaderUser";
import HeaderSearchMB from "./headerSearch/HeaderSearchMB";
import HeaderSearchPC from "./headerSearch/HeaderSearchPC";
import { findAllCategoryMenus } from "../../redux/slice/product/productCategory";
function Header() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findAllCategoryMenus())
    }, [dispatch])
    return (
        <div className="loading-header">
            <div className="header">
                <div className="container-fluid container-header ">
                    <div className="d-flex  header-mb-container navbar-collapse">
                        <HeaderMenusMB />
                        <HeaderMenusPc />
                        <HeaderSearchMB />
                        <ul className="navbar-nav ">
                            <HeaderSearchPC />
                            <HeaderCart />
                            <HeaderNotification />
                            <HeaderUser />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(Header);