import { memo, useEffect } from "react";
import SectionActionAdmin from "../../common/SectionActionAdmin";
import SearchContentAdmin from "../../common/SearchContentAdmin";
import TableManage from "../../../composite/table/TableManage";
import TitleActionAdmin from "../../common/TitleActionAdmin";
import { useDispatch, useSelector } from "react-redux";
import { createQueryParameter } from "../../../../redux/slice/common/queryParameter";
import { columnVariationOption, optionSearch, sectionActions } from "./initialConfig";
import TBodyTable from "./TBodyTable";

function Manage(props) {
    const { queryParameterInitial, url } = props;
    const dispatch = useDispatch();
    const { queryParameter } = useSelector(state => state.queryParameter)
    useEffect(() => {

        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    if (queryParameter === null) {
        return <></>
    }
    return (
        <div className="container-body-admin">
            <TitleActionAdmin />
            <SectionActionAdmin itemAction={sectionActions} />
            <SearchContentAdmin itemSearch={optionSearch} />
            <TableManage url={url} TBodyTable={TBodyTable} nameColumn={columnVariationOption} />
        </div>
    )
}
export default memo(Manage);