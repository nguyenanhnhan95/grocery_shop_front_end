import { useState } from "react";
import LogoSky from "../../../assets/img/header/logo-sky.png"
import "../../../assets/css/header/headerResponsive/headerMenusMB.css"
import { useSelector } from "react-redux";
function HeaderMenusMB() {
    const [isSidebarActive, setSidebarActive] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const { list } = useSelector((state) => state.productCategoryMenus)
    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
    };

    const closeSidebar = () => {
        setSidebarActive(false);
    };

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };
    return (
        <div className="header-item-mob">
            <ul className="nav">
                <li className="nav-item pl-1" onClick={toggleSidebar}>
                    <i className="fa-solid fa-bars "></i>
                </li>
            </ul>
            <div className={`header-drop-items-mob ${isSidebarActive ? 'active ' : ''}`}>
                <i className="close-header-drop-items-mob fa-solid fa-xmark" onClick={closeSidebar}></i>
                <div className="category-item-logo">
                    <img src={LogoSky} alt="Logo" />
                </div>
                <div className="header-item-mob-menu">
                    {list && list.map((parent, index) => (
                        <div className="header-item-mob-item" key={index}>
                            <button className={`header-item-mob-item-subs ${activeSubmenu === index ? 'clicked' : ''}`} onClick={() => toggleSubmenu(index)}>
                                <i className="fa-brands fa-product-hunt "></i>{parent.name}
                                <i className={`fa-solid fa-angle-right dropdown ${activeSubmenu === index ? 'rotate' : ''}`}></i>
                            </button>
                            {parent.children.map((child, zIndex) => (
                                <div className={`header-item-mob-item-sub ${activeSubmenu === index ? 'show ' : ''}`} key={zIndex}>
                                    <button className="header-item-mob-item-sub-item"><i className="fa-solid fa-caret-right"></i>{child.name}</button>
                                </div>
                            ))}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default HeaderMenusMB;