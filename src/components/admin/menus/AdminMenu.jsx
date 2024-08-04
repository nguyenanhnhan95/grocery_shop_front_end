import { memo, useCallback, useEffect, useRef } from "react";
import "../../../assets/css/admin/menus/menuAdmin.css"
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import logoBrand from "../../../assets/img/header/logo-sky.png"
import ContentAdminMenu from "./ContentAdminMenu";
import { FETCH_BY_PATH_MENU_ADMIN, FETCH_MENUS_ADMIN } from "../../../utils/commonConstants";
import { handlePathMenuAdmin } from "../../../utils/commonUtils";
import { getMenuByPathAdmin, getSidebarMenusAdmin } from "../../../redux/slice/admin/sidebar/menuContentMain";
import { onClickHandleOverPlay, onClickMenuAdminRef } from "../../../redux/slice/admin/sidebar/overPlayMenu";

function AdminMenu() {
  const isOpen = useSelector((state) => state.overPlayMenuMain.open)
  const { statusMenus, statusMenu } = useSelector((state) => state.menuContentMain);
  const dispatch = useDispatch();
  const menuAdminRef = useRef(null);
  const fetchMenus = useCallback(async () => {
    if (statusMenus === FETCH_MENUS_ADMIN.FETCH_MENUS_ADMIN_INITIAL) {
      dispatch(getSidebarMenusAdmin())
    }
  }, [statusMenus])
  const fetchMenuByPath = useCallback(async (path) => {
    if (statusMenu === FETCH_BY_PATH_MENU_ADMIN.FETCH_BY_PATH_MENU_ADMIN_INITIAL) {
      dispatch(getMenuByPathAdmin(path));
    }
  }, [statusMenu])
  useEffect(() => {
    fetchMenus()
  }, [statusMenus])
  useEffect(() => {
    fetchMenuByPath(handlePathMenuAdmin(window.location.href))
  }, [statusMenu])
  const handleClickOutsideMenuAdmin = useCallback((target) => {
    return menuAdminRef.current && menuAdminRef.current.contains(target);
  },[])
  useEffect(() => {
    dispatch(onClickMenuAdminRef(handleClickOutsideMenuAdmin))
  }, [dispatch,handleClickOutsideMenuAdmin])
  const completeApi=()=>{
    return statusMenus == FETCH_MENUS_ADMIN.FETCH_MENUS_ADMIN_SUCCESS && statusMenu === FETCH_BY_PATH_MENU_ADMIN.FETCH_BY_PATH_MENU_ADMIN_SUCCESS;
  }
  return (
    <div className={`main-menu  menu-fixed menu-light menu-accordion menu-shadow menu-native-scroll expanded ${isOpen ? `open` : ``}`} ref={menuAdminRef} >
      <div className="row main-menu-logo">
        <div className="col-8">
          <div className="menu-logo">
            <img src={logoBrand} alt="" />
          </div>
        </div>
        <div className="col-4 close-overPlay">
          <i className="fa-solid fa-xmark " onClick={() => dispatch(onClickHandleOverPlay(false))}></i>
        </div>
      </div>
      {completeApi() && (
        <ContentAdminMenu />
      )}
    </div>
  )
}
export default memo(AdminMenu);