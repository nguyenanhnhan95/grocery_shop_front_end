import {  useSelector } from "react-redux";
import LogoSky from "../../../assets/img/header/logo-sky.png"
import "../../../assets/css/header/headerResponsive/headerMenusPC.css"
function HeaderMenusPc() {
    const {  list } = useSelector((state) => state.productCategoryMenus)
    return (
        <div className="header-menu-pc">
            <div className="header-logo header-item">
                <img src={LogoSky} alt="" />
            </div>
            <div className="drop-menu header-item ">
                <ul className="nav" >
                    {list && list.map((parent, index) => (
                        <li className="nav-item category-item d-flex align-items-center dropdown" key={index}>
                            {parent.name}
                            <ul className="dropdown-menu">
                                {parent.children.map((child, zIndex) => (
                                    <li key={zIndex}>
                                        <div className="dropdown-item"><i className="fa-solid fa-caret-right" />{child.name}</div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}
export default HeaderMenusPc;