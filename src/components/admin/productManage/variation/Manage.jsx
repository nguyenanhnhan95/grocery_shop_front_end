import { memo, useEffect } from "react";
import SearchContentAdmin from "../../common/SearchContentAdmin";
import SectionActionAdmin from "../../common/SectionActionAdmin";
import TableManage from "../../../composite/table/TableManage";
import TitleActionAdmin from "../../common/TitleActionAdmin";
import TBodyTable from "./TBodyTable"
import { useDispatch, useSelector } from "react-redux";
import { createQueryParameter } from "../../../../redux/slice/common/queryParameter";
import { columnVariation, variationAction, variationSearch } from "./initialConfig";
function Manage(props) {
    const { queryParameterInitial,url } = props;
    const dispatch = useDispatch();
    const { queryParameter } = useSelector(state => state.queryParameter)
    useEffect(() => {
        
        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    if(queryParameter===null){
        return <></>
    }
    return (
        <div className="container-body-admin">
            <TitleActionAdmin />
            <SectionActionAdmin  itemAction={variationAction}/>
            <SearchContentAdmin  itemSearch={variationSearch}/>
            <TableManage  url={url} TBodyTable={TBodyTable} nameColumn={columnVariation} />
        </div>
    )
}
export default memo(Manage);