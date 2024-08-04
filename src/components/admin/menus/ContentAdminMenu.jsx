import { Fragment, memo,  useEffect,  useState } from "react";
import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LINK_DOMAIN } from "../../../utils/commonConstants";
import { transferMenuToContentMain } from "../../../redux/slice/admin/sidebar/menuContentMain";


function ContentAdminMenu() {
    const { menus, menu, menuParentActive } = useSelector((state) => state.menuContentMain);
    const dispatch = useDispatch();
    const [menuActive, setMenuActive] = useState(menuParentActive);
    const handleChangeOpenMenu = (menu, flagMenu) => {
        if (menu) {
            if (flagMenu) {
                if (menuActive === null || menuActive !== menu) {
                    setMenuActive(menu)
                } else {
                    setMenuActive(null)
                }
            } else {
                dispatch(transferMenuToContentMain(menu))
            }
        }

    }

    useEffect(() => {
        setMenuActive(menuParentActive)
    }, [menuParentActive])
    
    return (
        <div className="main-menu-content ps ps--active-y">
            <ul id="main-menu-navigation" className="navigation navigation-main" data-menu="menu-navigation">
                {menus.length !== 0 && (
                    <li className={`nav-item ${menus[0].href === menu?.href ? 'active' : ''}`} onClick={() => handleChangeOpenMenu(menus[0], false)}>
                        <NavLink className="d-flex align-items-center" to={menus[0].href} >
                            <i className="fa-solid fa-house " />
                            <span className="menu-item text-truncate">Tổng quan</span>
                        </NavLink>
                    </li>
                )}
                {menus && menus.map((parent, index) => (
                    <Fragment key={index}>
                        {!parent.visible && parent.header && (
                            <li className="navigation-header">
                                <span>{parent.title}</span>
                            </li>
                        )}
                        {!parent.header && index !== 0 && (
                            <li className={`nav-item   menu-item-animating ${menuActive?.href === parent.href ? 'open' : ''} ${parent.subMenus.length !== 0 ? 'has-sub ' : ''} `}   >
                                <div className="d-flex align-items-center menu-head " onClick={() => handleChangeOpenMenu(parent, true)} >
                                    <i className={parent.iconClass} />
                                    <span className="menu-title text-truncate">{parent.title}</span>
                                </div>
                                {parent.subMenus && parent.subMenus.map((children, zIndex) => (
                                    <ul className="menu-content" key={zIndex}>
                                        <li >
                                            <NavLink className={`d-flex align-items-center ${children?.href === menu?.href ? 'active' : ''}`} to={`${LINK_DOMAIN.domainClient}${children.href}`}
                                                onClick={() => handleChangeOpenMenu(children, false)}>
                                                <i className={children.iconClass} />
                                                <span className="menu-item text-truncate">{children.title}</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                ))}
                            </li>
                        )}
                    </Fragment>
                ))}
            </ul>
        </div>
    )
}
export default memo(ContentAdminMenu)