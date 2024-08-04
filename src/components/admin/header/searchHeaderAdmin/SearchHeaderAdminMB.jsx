import { memo } from "react";
import "../../../../assets/css/admin/header/headerSearchAdmin/headerSearchAdminMB.css"
function SearchHeaderAdminMB(props) {
    const {setOverSearchMB,refClickSearchMB} = props;
    return (
        <li className="header-search-admin-mb nav-item" onClick={()=>setOverSearchMB(true)} ref={refClickSearchMB}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </li>
    )
}
export default memo(SearchHeaderAdminMB)