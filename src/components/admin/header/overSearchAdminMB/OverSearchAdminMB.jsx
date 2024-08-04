import { memo, useEffect, useRef } from "react";
import "../../../../assets/css/admin/header/overSearchAdminMB/overSearchAdminMB.css"
function OverSearchAdminMB(props) {
    const coverElement = useRef(null)
    const { setOverSearchMB, refClickSearchMB } = props;
    useEffect(() => {
        function handleClickOutside(event) {
            if (coverElement?.current && !coverElement?.current.contains(event.target) && !refClickSearchMB?.current.contains(event.target)) {
                setOverSearchMB(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className="header-search-admin-over-mb " ref={coverElement}>
            <div className="navbar-collapse">
                <ul className="navbar-nav ">
                    <li className="nav-item handle-icon">
                        <i className="fa-solid fa-arrow-left-long" onClick={() => setOverSearchMB(false)}></i>
                    </li>
                    <li className="nav-item handle-input">
                        <input placeholder="Tìm kiếm" className="form-control" />
                    </li>
                    <li className="nav-item handle-icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default memo(OverSearchAdminMB)