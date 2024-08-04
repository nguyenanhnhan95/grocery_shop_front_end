import "../../assets/css/admin/admin.css";
import ContentAdmin from "../../components/admin/content/ContentAdmin"
import { memo, useEffect } from "react";
import AdminMenu from "../../components/admin/menus/AdminMenu";
function Admin() {

    return (

        <div className='container-fluid container-main d-flex '>           
            <AdminMenu  />
            <ContentAdmin />
        </div>
    )
}
export default memo(Admin);