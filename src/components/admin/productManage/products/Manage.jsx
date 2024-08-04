import TableManage from "../../../composite/table/TableManage";
import SearchContentAdmin from "../../common/SearchContentAdmin";
import SectionActionAdmin from "../../common/SectionActionAdmin";
import TitleActionAdmin from "../../common/TitleActionAdmin";


function Manage() {
    return (
        <div className="container-body-admin">
            <TitleActionAdmin />
            <SectionActionAdmin />
            <SearchContentAdmin />
            <TableManage />
        </div>
    )
}
export default Manage;