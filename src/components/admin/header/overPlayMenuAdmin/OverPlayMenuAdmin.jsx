import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClickHandleOverPlay } from "../../../../redux/slice/admin/sidebar/overPlayMenu";

function OverPlayMenuAdmin() {
    const dispatch = useDispatch();
    const openMenuRef = useRef(null)
    const handleOpenMenuMainOnClick = (open) => {
        dispatch(onClickHandleOverPlay(open))
    }
    const clickMenuAdminRef = useSelector(state => state.overPlayMenuMain.clickMenuAdminRef)
    useEffect(() => {
        function handleClickOutside(event) {
            try {
                if (openMenuRef.current && clickMenuAdminRef) {
                    if (!clickMenuAdminRef(event.target)) {
                        if (!openMenuRef.current.contains(event.target)) {
                            handleOpenMenuMainOnClick(false)
                        } else {
                            handleOpenMenuMainOnClick(true)
                        }
                    }
                }
            } catch (error) {
                console.error(error)
            }

        }
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [clickMenuAdminRef]);
    return (
        <li className="nav-item main-content-header-list" >
            <i className="fa-solid fa-bars " ref={openMenuRef} ></i>
        </li>
    )
}
export default memo(OverPlayMenuAdmin)