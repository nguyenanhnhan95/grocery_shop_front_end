import "../../assets/css/admin/admin.css";
import ContentAdmin from "../../components/admin/content/ContentAdmin"
import { memo} from "react";
import AdminMenu from "../../components/admin/menus/AdminMenu";
import { useAuthorizePage } from "../../hook/auth/useAuthorizePage";

function Admin() {
    const {authorize}= useAuthorizePage(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_EMPLOYEE"]);
    return (
        <>{ authorize  &&
            <div className='container-fluid container-main d-flex ' >
                <AdminMenu />
                <ContentAdmin />
            </div>
        }
        {
            !authorize &&  <></>
        }
        </>
    )
}
export default memo(Admin);